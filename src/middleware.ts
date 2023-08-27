import { authPages, defaultLocale, locales, publicPages } from "./constants";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    pages: authPages,
  }
);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages.join("|")})?/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(req.nextUrl.href + defaultLocale);
  }

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  // Skip internal paths
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
