import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Jika user sudah login dan akses /auth/signin → redirect ke "/"
  if (token) {
    if (pathname === "/auth/signin" || pathname === "/auth/signup") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Jika belum login dan akses halaman yang butuh proteksi → redirect ke /auth/signin
  if (!token && pathname.startsWith("/checkout")) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/wishlist(.*)",
    "/payment(.*)",
    "/checkout(.*)",
    "/history(.*)",
    "/auth/signin",
    "/auth/signup",
  ],
};
