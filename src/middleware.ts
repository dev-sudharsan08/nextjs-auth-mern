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

  // If no token and not on public route, try to refresh
  if (!token && !isPublicRoute) {
    if (refreshToken) {
      try {
        // Try to refresh the token
        const fetchResponse = await fetch(new URL('/api/users/refresh-token', request.url), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': `refreshToken=${refreshToken}`
          },
        });

        if (fetchResponse.ok) {
          const data = await fetchResponse.json();
          const newToken = data.token;

          // Create response with new token
          const nextResponse = NextResponse.next();
          nextResponse.cookies.set('token', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60, // 15 minutes
          });
          return nextResponse;
        }
      } catch (error) {
        console.error('Token refresh failed:', error);
      }
    }

    // If refresh failed or no refresh token, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If token exists, verify it
  if (token && !isPublicRoute) {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
      // Token is valid, continue
      return NextResponse.next();
    } catch (error) {
      // Token is invalid, try to refresh
      if (refreshToken) {
        try {
          const fetchResponse = await fetch(new URL('/api/users/refresh-token', request.url), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Cookie': `refreshToken=${refreshToken}`
            },
          });

          if (fetchResponse.ok) {
            const data = await fetchResponse.json();
            const newToken = data.token;

            const nextResponse = NextResponse.next();
            nextResponse.cookies.set('token', newToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              maxAge: 15 * 60, // 15 minutes
            });
            return nextResponse;
          }
        } catch (error) {
          console.error('Token refresh failed:', error);
        }
      }

      // If refresh failed, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}