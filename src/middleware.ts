import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("Nest-Auth");

  if (!cookie || !cookie.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
