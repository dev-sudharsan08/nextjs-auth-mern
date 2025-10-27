import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import sendEmail from '@/helpers/mailer';

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'No user found with this email. Please provide a valid email.' },
        { status: 400 }
      );
    }

    await sendEmail({
      email: user.email,
      emailType: 'RESET',
      userId: user._id,
    });

    return NextResponse.json(
      {
        message: 'Password reset email sent successfully',
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
