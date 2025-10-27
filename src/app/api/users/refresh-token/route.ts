import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

connectDB();

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token provided' }, { status: 401 });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as any;

    // Find user and verify refresh token
    const user = await User.findOne({
      _id: decoded.userId,
      refreshToken: refreshToken
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.TOKEN_SECRET!,
      { expiresIn: '1h' }
    );

    // Generate new refresh token
    const newRefreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: '5d' }
    );

    // Update user's refresh token
    user.refreshToken = newRefreshToken;
    await user.save();

    const response = NextResponse.json(
      {
        message: 'Token refreshed successfully',
        success: true,
        token: newAccessToken,
      },
      { status: 200 }
    );

    // Set new cookies
    response.cookies.set('token', newAccessToken, {
      httpOnly: true,
      maxAge: 60 * 60,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    response.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      maxAge: 5 * 24 * 60 * 60,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: 'Invalid or expired refresh token' }, { status: 401 });
  }
}
