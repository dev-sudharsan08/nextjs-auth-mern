import { NextRequest, NextResponse } from 'next/server';
import { connectDB, User } from '../../../../lib/paths';
import getDataFromToken from '@/helpers/getDataFromToken';

connectDB();

export async function DELETE(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required. Token missing or invalid.' },
        { status: 401 }
      );
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json(
        { error: 'User not found or already deleted.' },
        { status: 404 }
      );
    }

    const response = NextResponse.json(
      {
        message: 'User deleted successfully. Session terminated.',
        isDeleted: true,
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
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}