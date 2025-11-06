import connectDB from '@/dbConfig/dbConfig';
import User from '../../../../models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import sendEmail from '@/helpers/mailer';
import getDataFromToken from '@/helpers/getDataFromToken';

connectDB();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await sendEmail({
      email: user?.email,
      emailType: 'VERIFY',
      userId: user?._id,
    });

    return NextResponse.json(
      {
        data: {
          message: 'Verification link has been sent to your mail. Please check your inbox.',
          isVerificationMailSent: true,
          success: true,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: 'An unknown error occurred' },
        { status: 500 }
      );
    }
  }
}
