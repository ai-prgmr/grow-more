import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

let locales = ["en", "hi"];
let defaultLocale = "en";

function getLocale(request: NextRequest): string {
    const headers = { "accept-language": request.headers.get("accept-language") || "" };
    const languages = new Negotiator({ headers }).languages();
    return match(languages, locales, defaultLocale);
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip internal paths and assets
    if (
        pathname.startsWith("/_next") ||
        pathname.includes("/api/") ||
        pathname.includes(".") // files like .svg, .png etc
    ) {
        return;
    }

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        "/((?!_next).*)",
    ],
};
