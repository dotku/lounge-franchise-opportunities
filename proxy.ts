import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "zh"];
const defaultLocale = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to default locale if no locale in pathname
  if (pathname === "/") {
    // Try to detect browser language
    const browserLang = request.headers.get("accept-language");
    const detectedLocale = browserLang?.includes("zh") ? "zh" : defaultLocale;

    request.nextUrl.pathname = `/${detectedLocale}`;
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
