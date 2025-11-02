import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
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

  } catch (error: any) {
    console.error("User deletion error:", error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during deletion.' },
      { status: 500 }
    );
  }
}