import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Intercept old /en and /fr routes
  const match = pathname.match(/^\/(en|fr)(?:\/(.*))?$/);
  
  if (match) {
    const lang = match[1];
    const rest = match[2] || '';
    
    // Redirect to the pure route cleanly, removing the [lang]/ prefix
    const url = request.nextUrl.clone();
    url.pathname = `/${rest}`;
    
    // Create the response and set the locale hydration cookie immediately
    const response = NextResponse.redirect(url);
    response.cookies.set('NEXT_LOCALE', lang, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, icons, models, gallery, generic static assets, og.me
     */
     "/((?!api|_next/static|_next/image|google5ac449b5ff3c8630.html|llm.txt|favicon.ico|wistant-logo.png|og.me|icons|me|fonts|gallery|certifications|opengraph|robots.txt|sitemap.xml|experiences|resume|portfolio|blog|projects|thumbnails|authors|education|hackatons|logos).*)",
  ],
};
