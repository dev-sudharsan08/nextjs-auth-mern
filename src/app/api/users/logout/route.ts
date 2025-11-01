import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import getDataFromToken from '@/helpers/getDataFromToken';

connectDB();

export async function GET(request: NextRequest) {
  try {
    let userId = null;
    try {
      userId = await getDataFromToken(request);
    } catch (err: any) {
      console.log('Token verification failed during logout:', err.message);
      // Token not valid or missing, allow logout without DB update
    }

    if (userId) {
      await User.findByIdAndUpdate(userId, { refreshToken: null });
    }

    const response = NextResponse.json(
      {
        message: 'User logged out successfully',
        success: true,
      },
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
  } catch (error: any) {
    console.error('Logout API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
