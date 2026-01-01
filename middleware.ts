import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      await decrypt(session);
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup") {
    if (session) {
      try {
        await decrypt(session);
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } catch (error) {
        // Invalid session, allow login/signup
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
