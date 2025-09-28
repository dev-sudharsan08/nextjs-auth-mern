import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicRoute =
    path === '/signup' ||
    path === '/login' ||
    path === '/verify-email' ||
    path === '/forgot-password' ||
    path === '/reset-password' ||
    path === '/features' ||
    path === '/contact' ||
    path === '/';

  const token = request.cookies.get('token')?.value || '';
  const refreshToken = request.cookies.get('refreshToken')?.value || '';

  // If user has token and is on public route, redirect to profile
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // If no token and not on public route, redirect to login
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If token exists, verify it
  if (token && !isPublicRoute) {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
      // Token is valid, continue
      return NextResponse.next();
    } catch (error) {
      // Token is invalid, redirect to login
      // Note: We don't try to refresh here to avoid middleware complexity
      // Token refresh should be handled by the client-side or API routes
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}