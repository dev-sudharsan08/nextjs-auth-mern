import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicRoute =
    path === '/login' ||
    path === '/' ||
    path === '/forgot-password' ||
    path === '/reset-password' ||
    path === '/signup';

  const isProtectedRoute =
    path === '/dashboard' ||
    path === '/change-password' ||
    path === '/update-profile' ||
    path === '/logout';

  const token = request.cookies.get('token')?.value || '';

  // if (path === '/logout' && request.nextUrl.searchParams.has('reason')) {
  //   return NextResponse.next();
  // }

  if (token) {
    try {
      jwt.decode(token);
      if (isPublicRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/logout?reason=expired', request.url));
    }
  } else if (isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
