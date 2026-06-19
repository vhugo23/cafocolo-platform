import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE_NAME = "cafocolo_admin_token";

/**
 * Frontend route protection for admin pages.
 *
 * Why this exists:
 * - Public visitors should access / and /request-quote.
 * - Admin pages should require a login cookie.
 * - The cookie is HTTP-only, but middleware can still check whether it exists
 *   because middleware runs on the server side.
 *
 * Important limitation:
 * - This only protects frontend routes.
 * - The backend APIs still need their own protection after this step.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname === "/admin/login";

  const adminToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isLoggedIn = Boolean(adminToken);

  /*
   * If the user is already logged in, keep them out of the login page.
   */
  if (isLoginRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  /*
   * If the user is not logged in, block admin pages.
   * /admin/login remains open.
   */
  if (isAdminRoute && !isLoginRoute && !isLoggedIn) {
    const loginUrl = new URL("/admin/login", request.url);

    /*
     * Store where the user was trying to go.
     * Later we can use this to return them to the original page after login.
     */
    loginUrl.searchParams.set("from", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

/**
 * Only run middleware on admin routes.
 * Public routes, static assets, and API files do not need this middleware.
 */
export const config = {
  matcher: ["/admin/:path*"],
};