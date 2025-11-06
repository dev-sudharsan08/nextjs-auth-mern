import { NextRequest, NextResponse } from 'next/server';
import { connectDB, User, sendEmail } from '../../../../lib/paths';
import bcryptjs from 'bcryptjs';

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser, 'savedUser');

    await sendEmail({
      email: savedUser?.email,
      emailType: 'VERIFY',
      userId: savedUser._id,
    });

    return NextResponse.json(
      {
        data: {
          message: 'User created successfully',
          isVerificationMailSent: true,
          success: true,
          savedUser,
        },
      },
      { status: 201 }
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
