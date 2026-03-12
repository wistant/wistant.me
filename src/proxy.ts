import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const locales = ["en", "fr", "es", "ar", "wo"];
const defaultLocale = "en";

// We duplicate KEY getting here because proxy runs on EDGE
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "fallback-secret-for-dev-only-change-in-prod";
const KEY = new TextEncoder().encode(JWT_SECRET);

// Rate Limiter: 5 requests per minute allowed for login protection
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

let ratelimit: Ratelimit | null = null;
if (redisUrl && redisToken) {
  ratelimit = new Ratelimit({
    redis: new Redis({
      url: redisUrl,
      token: redisToken,
    }),
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    analytics: true,
  });
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Retrieve IP securely in Edge runtime
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";

  // 1. ADMIN ROUTES PROTECTION (ZERO-TRUST)
  const isAdminRoute = pathname.includes("/admin");
  const isLoginRoute = pathname.includes("/admin/login");
  const isAuthCallback = pathname.includes("/api/admin/auth/callback");

  // Protect Login Route against Bots & Brute Force
  if (isLoginRoute && ratelimit) {
    const { success } = await ratelimit.limit(`ratelimit_${ip}`);
    if (!success) {
      return new NextResponse("Trop de tentatives de connexion (Bots interdits). Veuillez réessayer dans 1 minute.", {
        status: 429,
      });
    }
  }

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
      console.warn("Invalid JWT token detected on edge:", err);
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
