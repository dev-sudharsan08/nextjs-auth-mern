import { NextRequest, NextResponse } from 'next/server';
import { connectDB, User } from '../../../../lib/paths';
import bcryptjs from 'bcryptjs';

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    user.lastPasswordChangedAt = new Date();

    await user.save();

    return NextResponse.json(
      {
        message: 'Password reset successfully',
        success: true,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
