import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./lib/config/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isPublicRoute =
    nextUrl.pathname === '/login' ||
    nextUrl.pathname === '/' ||
    nextUrl.pathname === '/forgot-password' ||
    nextUrl.pathname === '/reset-password' ||
    nextUrl.pathname === '/signup';

  const isProtectedRoute =
    nextUrl.pathname === '/dashboard' ||
    nextUrl.pathname === '/change-password' ||
    nextUrl.pathname === '/update-profile' ||
    nextUrl.pathname === '/logout';

  // 2. Redirect Logic

  // Case A: User is logged in but tries to visit public auth pages (like /login)
  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  // Case B: User is NOT logged in but tries to visit protected pages
  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  return NextResponse.next();
});

// 3. Matcher Config (Same as before)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};