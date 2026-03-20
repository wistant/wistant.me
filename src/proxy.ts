import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/admin/server/oauth/session";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { LOCALES } from "@/types/locale";

const defaultLocale = "en";

// Initialize Redis only if env vars exist to prevent crashing local dev
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = (redisUrl && redisToken) 
  ? new Redis({ url: redisUrl, token: redisToken }) 
  : null;

// Rate Limiter: 20 requests per 10 seconds for API and login protection
const ratelimit = redis ? new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '10 s'),
  analytics: true,
}) : null;

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Retrieve IP securely in Edge runtime
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";

  // 1. ADMIN ROUTES PROTECTION (ZERO-TRUST & RATE LIMITING)
  const isApiAdmin = pathname.startsWith("/api/admin");
  const isPageAdmin = pathname.includes("/admin") && !isApiAdmin;
  const isLoginRoute = pathname.includes("/admin/login");
  const isAuthCallback = pathname.includes("/api/admin/auth/callback");

  // Protect Login and API Routes against Bots & Brute Force
  if ((isApiAdmin || isLoginRoute) && ratelimit) {
    const { success, limit, remaining } = await ratelimit.limit(`ratelimit_${ip}`);
    if (!success) {
      console.warn(`[RATE_LIMIT] Blocked request from ${ip}`);
      if (isApiAdmin) {
        return NextResponse.json(
          { error: "Too many requests. Cyber-Premium rate limit enforced." },
          { status: 429, headers: { "X-RateLimit-Limit": limit.toString(), "X-RateLimit-Remaining": remaining.toString() } }
        );
      }
      return new NextResponse("Trop de tentatives de connexion (Bots interdits). Veuillez réessayer plus tard.", {
        status: 429,
      });
    }
  }

  // Zero-Trust Auth Verification for restricted routes
  if ((isPageAdmin || isApiAdmin) && !isLoginRoute && !isAuthCallback) {
    const token = request.cookies.get("admin_token")?.value;
    
    if (!token) {
      if (isApiAdmin) {
        return NextResponse.json({ error: "Unauthorized: Zero-Trust Policy Enforced" }, { status: 401 });
      }
      return NextResponse.redirect(new URL(`/${defaultLocale}/admin/login`, request.url));
    }

    // Cryptographic Session Verification
    const session = await verifySession(token);

    if (!session) {
      console.warn(`[AUTH_DENIED] Invalid or expired token for ${pathname}`);
      const response = isApiAdmin 
        ? NextResponse.json({ error: "Invalid Session" }, { status: 401 }) 
        : NextResponse.redirect(new URL(`/${defaultLocale}/admin/login`, request.url));
        
      response.cookies.delete("admin_token");
      return response;
    }
  }

  // 2. I18n LOGIC (Skip for API routes)
  if (isApiAdmin) {
     return NextResponse.next();
  }

  // Check if pathname already starts with a supported locale
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect if there is no locale
  const acceptLang = request.headers.get("accept-language") || "";
  const matchedLocale = LOCALES.find(locale => acceptLang.includes(locale)) || defaultLocale;

  request.nextUrl.pathname = `/${matchedLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next/static|_next/image|favicon.ico|icons|me|fonts|gallery|opengraph|robots.txt|sitemap.xml|experiences|portfolio|blog/thumbnails|blog/authors|education|hackatons|logos).*)",
  ],
};
