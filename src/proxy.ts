import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { LOCALES } from "@/types/locale";

const defaultLocale = "en";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;



  // Check if pathname already starts with a supported locale
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    // If it's a localized API call, redirect to global API to avoid 404
    if (pathname.match(/^\/[a-z]{2}\/api\//)) {
      const newPath = pathname.replace(/^\/[a-z]{2}\/api\//, "/api/");
      request.nextUrl.pathname = newPath;
      return NextResponse.redirect(request.nextUrl);
    }
    return NextResponse.next();
  }

  // Redirect if there is no locale
  const acceptLang = request.headers.get("accept-language") || "";
  const matchedLocale = LOCALES.find(locale => acceptLang.includes(locale)) || defaultLocale;

  request.nextUrl.pathname = `/${matchedLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|_next/static|_next/image|favicon.ico|icons|me|fonts|gallery|certifications|opengraph|robots.txt|sitemap.xml|experiences|portfolio|blog/thumbnails|blog/authors|education|hackatons|logos).*)",
  ],
};
