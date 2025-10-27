import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import getDataFromToken from '@/helpers/getDataFromToken';
import bcryptjs from 'bcryptjs';

connectDB();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const { currentPassword, newPassword } = await request.json();

        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { error: 'Current password and new password are required' },
                { status: 400 }
            );
        }

        // if (newPassword.length < 6) {
        //   return NextResponse.json(
        //     { error: 'New password must be at least 6 characters long' },
        //     { status: 400 }
        //   );
        // }

        // Find user and include password for verification
        const user = await User.findById(userId).select('+password');
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Verify current password
        const isCurrentPasswordValid = await bcryptjs.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            return NextResponse.json(
                { error: 'Current password is incorrect' },
                { status: 400 }
            );
        }

        // Hash new password
        const salt = await bcryptjs.genSalt(10);
        const hashedNewPassword = await bcryptjs.hash(newPassword, salt);

        // Update password
        user.password = hashedNewPassword;
        user.lastPasswordChange = new Date();
        await user.save();

        return NextResponse.json(
            { message: 'Password changed successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}