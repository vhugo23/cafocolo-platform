import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE_NAME = "cafocolo_admin_token";

/**
 * Frontend route protection for admin pages.
 *
 * Public pages remain open.
 * English admin routes use /admin.
 * Portuguese admin routes use /pt/admin.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isEnglishAdminRoute = pathname.startsWith("/admin");
  const isPortugueseAdminRoute = pathname.startsWith("/pt/admin");
  const isAdminRoute = isEnglishAdminRoute || isPortugueseAdminRoute;

  const isEnglishLoginRoute = pathname === "/admin/login";
  const isPortugueseLoginRoute = pathname === "/pt/admin/login";
  const isLoginRoute = isEnglishLoginRoute || isPortugueseLoginRoute;

  const adminToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isLoggedIn = Boolean(adminToken);

  if (isLoginRoute && isLoggedIn) {
    const dashboardPath = isPortugueseLoginRoute ? "/pt/admin" : "/admin";
    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  if (isAdminRoute && !isLoginRoute && !isLoggedIn) {
    const loginPath = isPortugueseAdminRoute
      ? "/pt/admin/login"
      : "/admin/login";

    const loginUrl = new URL(loginPath, request.url);
    loginUrl.searchParams.set("from", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/pt/admin/:path*"],
};