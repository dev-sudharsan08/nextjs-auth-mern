import { NextRequest } from 'next/server';
import { auth } from '../config/auth';

export default async function getDataFromToken(request: NextRequest): Promise<string | null> {
  try {
    // 1. Fetch the session using NextAuth's server-side helper
    const session = await auth();

    // 2. Validate if session and user ID exist
    if (!session || !session.user || !session.user.id) {
      return null;
    }

    // 3. Return the ID (which we mapped from MongoDB in auth.ts)
    return session.user.id;

  } catch (err) {
    console.error('Error getting session:', err);
    return null;
  }
}