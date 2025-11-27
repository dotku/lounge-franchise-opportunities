import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidRegion, defaultRegion, type Region } from "./app/config/regions";

const locales = ["en", "zh"];
const defaultLocale = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Parse pathname segments
  const segments = pathname.split("/").filter(Boolean);
  const [firstSegment, secondSegment] = segments;

  // Check if pathname already has both lang and region
  if (
    firstSegment &&
    locales.includes(firstSegment) &&
    secondSegment &&
    isValidRegion(secondSegment)
  ) {
    return NextResponse.next();
  }

  // Detect browser language
  const browserLang = request.headers.get("accept-language");
  const detectedLocale = browserLang?.includes("zh") ? "zh" : defaultLocale;

  // Case 1: Root path "/" -> redirect to /{lang} (region selection page)
  if (pathname === "/") {
    request.nextUrl.pathname = `/${detectedLocale}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Case 2: Only language "/{lang}" without region -> show region selection page
  if (firstSegment && locales.includes(firstSegment) && !secondSegment) {
    return NextResponse.next();
  }

  // Case 3: Language with invalid region "/{lang}/{invalid}" -> redirect to region selection
  if (
    firstSegment &&
    locales.includes(firstSegment) &&
    secondSegment &&
    !isValidRegion(secondSegment)
  ) {
    request.nextUrl.pathname = `/${firstSegment}`;
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
