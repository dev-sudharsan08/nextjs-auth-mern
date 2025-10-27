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

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'New password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    const user = await User.findById(userId).select('+password');
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const isCurrentPasswordValid = await bcryptjs.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    const isNewPasswordSameAsCurrent = await bcryptjs.compare(newPassword, user.password);
    if (isNewPasswordSameAsCurrent) {
      return NextResponse.json(
        { error: 'The new password must be different from the current password' },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedNewPassword = await bcryptjs.hash(newPassword, salt);

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