import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import getDataFromToken from '../../../../helpers/getDataFromToken';

connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select(
      '-password -refreshToken -emailVerificationToken -emailVerificationTokenExpiry -isAdmin -forgotPasswordToken - forgotPasswordTokenExpiry'
    );

    return NextResponse.json(
      { message: 'User found', data: user },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}