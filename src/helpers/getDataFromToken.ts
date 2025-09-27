import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export default async function getDataFromToken(request: NextRequest) {
  try {
    const encodedToken = request.cookies.get('token')?.value || '';
    const decodedToken: any = jwt.verify(encodedToken, process.env.TOKEN_SECRET!);
    return decodedToken.userId;
  } catch (err: any) {
    throw new Error(err.message);
  }
}




