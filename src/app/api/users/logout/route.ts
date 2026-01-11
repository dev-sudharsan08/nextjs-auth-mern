import { NextRequest, NextResponse } from 'next/server';
import { connectDB, User } from '../../../../lib/paths';
import getDataFromToken from '@/lib/helpers/getDataFromToken';

connectDB();

export async function GET(request: NextRequest) {
  try {
    let userId = null;
    try {
      userId = await getDataFromToken(request);
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

    response.cookies.delete('token');
    response.cookies.delete('refreshToken');

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
