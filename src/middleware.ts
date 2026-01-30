import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Check if user is trying to access the admin panel
  if (request.nextUrl.pathname.startsWith("/admin")) {
    
    // 2. Exception: Allow them to visit the login page itself!
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // 3. Check for the "admin_session" cookie
    const session = request.cookies.get("admin_session");

    // 4. If no cookie, kick them to the login page
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};