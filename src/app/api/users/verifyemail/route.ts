import { NextResponse, NextRequest } from 'next/server';
import { User, connectDB } from '../../../../lib/paths';

connectDB();

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token or user' },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpiry = undefined;

    await user.save();
    return NextResponse.json(
      { data: { message: 'User verified successfully', isUserVerified: true } },
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

