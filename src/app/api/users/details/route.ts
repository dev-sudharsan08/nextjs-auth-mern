import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/dbConfig/dbConfig';
import User from '../../../../models/userModel';
import getDataFromToken from '../../../../helpers/getDataFromToken';

connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required. Token missing or invalid.' },
        { status: 401 }
      );
    }

    const user = await User.findOne({ _id: userId }).select(
      '-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry -isAdmin -forgotPasswordToken -forgotPasswordTokenExpiry -__v -_id -updatedAt'
    );

    return NextResponse.json(
      { message: 'User found', data: user },
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