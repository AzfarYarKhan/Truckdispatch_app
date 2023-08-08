import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/driver/:path*",
    "/auth/:path*",
    "/",
  ],
};

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const is_authenticated = !!token;
    const is_authpage =
      req.nextUrl.pathname.startsWith("/auth") || req.nextUrl.pathname === "/";

    if (is_authpage) {
      if (is_authenticated) {
        if (req.nextauth.token?.role === "admin") {
          return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }
        if (req.nextauth.token?.role === "driver") {
          return NextResponse.redirect(new URL("/driver/dashboard", req.url));
        }
      }
      return null;
    }

    if (!is_authenticated) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/?from=${encodeURIComponent(from)}`, req.url)
      );
    }

    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.role !== "admin"
    ) {
      return new NextResponse("you are not authorized");
    }
    if (
      req.nextUrl.pathname.startsWith("/driver") &&
      req.nextauth.token?.role !== "driver"
    ) {
      return new NextResponse("you are not authorized");
    }
  },
  {
    callbacks: {
      async authorized() {
        // We always return true here so that the middleware function above can handle redirect on auth pages
        return true;
      },
    },
  }
);
