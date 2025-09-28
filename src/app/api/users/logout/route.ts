import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import getDataFromToken from '@/helpers/getDataFromToken';

connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    // Clear refresh token from database
    await User.findByIdAndUpdate(userId, { refreshToken: null });

    const response = NextResponse.json(
      {
        message: 'User logged out successfully',
        success: true,
      },
      { status: 200 }
    );

    // Clear cookies
    response.cookies.set('token', '', {
      httpOnly: true,
      maxAge: 0,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      maxAge: 0,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    return response;
  } catch (error: any) {
    // Even if there's an error, clear the cookies
    const response = NextResponse.json(
      { message: 'Logged out successfully', success: true },
      { status: 200 }
    );

    response.cookies.set('token', '', {
      httpOnly: true,
      maxAge: 0,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      maxAge: 0,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    return response;
  }
}