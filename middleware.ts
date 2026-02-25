import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";

const localePrefix = new RegExp(`^/(${locales.join("|")})(/|$)`);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip static files and api
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // favicon, etc.
  ) {
    return NextResponse.next();
  }

  // Already has locale prefix: allow
  if (localePrefix.test(pathname)) {
    return NextResponse.next();
  }

  // Root: redirect to default locale (could use Accept-Language to choose th/en)
  if (pathname === "/") {
    const preferred = request.cookies.get("NEXT_LOCALE")?.value;
    const locale =
      preferred === "th" || preferred === "en" ? preferred : defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // Legacy paths without locale: redirect to default locale
  const locale = request.cookies.get("NEXT_LOCALE")?.value;
  const targetLocale =
    locale === "th" || locale === "en" ? locale : defaultLocale;

  if (pathname === "/contact") {
    return NextResponse.redirect(new URL(`/${targetLocale}/contact`, request.url));
  }
  if (pathname === "/works") {
    return NextResponse.redirect(new URL(`/${targetLocale}/case-studies`, request.url));
  }
  if (pathname.startsWith("/works/")) {
    const slug = pathname.slice("/works/".length);
    return NextResponse.redirect(
      new URL(`/${targetLocale}/case-studies/${slug}`, request.url)
    );
  }
  if (pathname === "/blog") {
    return NextResponse.redirect(new URL(`/${targetLocale}/blog`, request.url));
  }
  if (pathname === "/content") {
    return NextResponse.redirect(new URL(`/${targetLocale}/content`, request.url));
  }
  if (pathname.startsWith("/content/")) {
    const slug = pathname.slice("/content/".length);
    return NextResponse.redirect(
      new URL(`/${targetLocale}/content/${slug}`, request.url)
    );
  }

  // Any other path without locale -> prefix with default locale
  return NextResponse.redirect(
    new URL(`/${targetLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|icon.png|favicon.ico).*)"],
};
