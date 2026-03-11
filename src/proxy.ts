import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const locales = ["en", "fr", "es", "ar", "wo"];
const defaultLocale = "en";

// We duplicate KEY getting here because proxy runs on EDGE
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "fallback-secret-for-dev-only-change-in-prod";
const KEY = new TextEncoder().encode(JWT_SECRET);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. ADMIN ROUTES PROTECTION (ZERO-TRUST)
  const isAdminRoute = pathname.includes("/admin");
  const isLoginRoute = pathname.includes("/admin/login");
  const isAuthCallback = pathname.includes("/api/admin/auth/callback");

  if (isAdminRoute && !isLoginRoute && !isAuthCallback) {
    const token = request.cookies.get("admin_token")?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL("/en/admin/login", request.url));
    }

    try {
      // Verify JWT on edge
      await jwtVerify(token, KEY);
    } catch (err) {
      // Invalid or expired token
      const response = NextResponse.redirect(new URL("/en/admin/login", request.url));
      response.cookies.delete("admin_token");
      return response;
    }
  }

  // 2. I18n LOGIC
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect if there is no locale
  const locale = request.headers.get("accept-language")?.startsWith("fr")
    ? "fr"
    : defaultLocale;

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|_next/static|_next/image|favicon.ico|icons|me|fonts|gallery|opengraph|robots.txt|sitemap.xml|experiences|portfolio|blog/thumbnails|blog/authors|education|hackatons|logos).*)",
  ],
};
