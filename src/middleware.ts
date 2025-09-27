




import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicRoute =
    path === '/signup' ||
    path === '/login' ||
    path === '/verify-email' ||
    path === '/';
  const token = request.cookies.get('token')?.value || '';

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};





