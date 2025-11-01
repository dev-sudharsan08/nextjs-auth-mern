import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export default async function getDataFromToken(request: NextRequest): Promise<string | null> {
  try {
    const encodedToken = request.cookies.get('token')?.value;
    if (!encodedToken) {
      return null;
    }
    const decodedToken: any = jwt.verify(encodedToken, process.env.TOKEN_SECRET!);
    return decodedToken.userId || null;
  } catch (err) {
    console.error('Error decoding token:', err);
    return null;
  }
}
