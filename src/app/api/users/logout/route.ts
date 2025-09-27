import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = NextResponse.json(
      { data: 'User logged out successfully', success: true },
      { status: 200 }
    );
    response.cookies.set('token', '', { httpOnly: true, maxAge: 0 });
    response.cookies.set('refreshToken', '', { httpOnly: true, maxAge: 0 });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}