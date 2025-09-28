import connectDB from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log(reqBody);
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    const isPasswordMatch = await bcryptjs.compare(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.TOKEN_SECRET!,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: '5d' }
    );

    user.refreshToken = refreshToken;
    await user.save();
    const response = NextResponse.json(
      {
        message: 'User logged in successfully',
        success: true,
        isLoginSuccess: true,
        data: {
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            isVerified: user.isVerified,
            createdAt: user.createdAt
          }
        }
      },
      { status: 200 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 60 * 60, // 1 hour
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 5 * 24 * 60 * 60, // 5 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: 'An unknown error occurred. Please try again later' },
        { status: 500 }
      );
    }
  }
}
