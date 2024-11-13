import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { routing } from "./lib/routing";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("Nest-Auth");
  if (!cookie || cookie.value === "deleted")
    return NextResponse.redirect(new URL(routing.login, request.url));

  const secret = new TextEncoder().encode(process.env.API_JWT_SECRET);

  const { payload } = await jwtVerify(cookie.value, secret);

  if (!payload) {
    return NextResponse.redirect(new URL(routing.login, request.url));
  }

  if (request.url.includes("admin") && !payload.isAdmin)
    return NextResponse.redirect(
      new URL("/dashboard/unauthorized", request.url)
    );

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
