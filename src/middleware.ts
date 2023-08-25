import { defaultLocale, locales } from "./constants";
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales,
  defaultLocale
})

export const config = {
  matcher: [
    // Skip internal paths
    "/((?!_next|api|favicon.ico).*)",
  ],
};
