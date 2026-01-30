import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the user is trying to access /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // Exception: Allow access to the login page itself!
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for the session cookie
    const hasSession = request.cookies.get('admin_session');

    // If no cookie, kick them to the login page
    if (!hasSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths this middleware runs on
export const config = {
  matcher: '/admin/:path*',
};