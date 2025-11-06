import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

interface TokenPayload {
  userId: string;
  email: string;
  iat?: number; 
  exp?: number;
}

export default async function getDataFromToken(request: NextRequest): Promise<string | null> {
  try {
    const encodedToken = request.cookies.get('token')?.value;
    if (!encodedToken) {
      return null;
    }
    const decodedToken = jwt.verify(encodedToken, process.env.TOKEN_SECRET!) as TokenPayload;
    return decodedToken.userId || null;
  } catch (err) {
    console.error('Error decoding token:', err);
    return null;
  }
}
