import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/dashboard", "/automations", "/logs", "/settings"];

// Upstream ships SEO landing pages to market the open-source project. This is a
// private instance, so they are sent to the home page instead of being deleted —
// leaving the files untouched keeps upstream merges clean.
// Deliberately NOT listed: /privacy, /terms and /data-deletion (Meta reviewers
// open these), /r (tracked-link redirects used inside sent DMs), /reports,
// /invite and /meta-review.
const MARKETING_PREFIXES = [
  "/manychat-alternative",
  "/comment-link-automation",
  "/instagram-comment-to-dm-templates",
  "/instagram-dm-automation-agencies",
  "/templates",
];

function hasSessionCookie(request: NextRequest): boolean {
  return (
    request.cookies.has("authjs.session-token") ||
    request.cookies.has("__Secure-authjs.session-token") ||
    request.cookies.has("next-auth.session-token") ||
    request.cookies.has("__Secure-next-auth.session-token")
  );
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
  const isLogin = pathname === "/login";
  const isAuthenticated = hasSessionCookie(request);

  const isMarketing = MARKETING_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isMarketing) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLogin && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/automations/:path*",
    "/logs/:path*",
    "/settings/:path*",
    "/login",
    "/manychat-alternative",
    "/comment-link-automation",
    "/instagram-comment-to-dm-templates",
    "/instagram-dm-automation-agencies",
    "/templates/:path*",
    "/templates",
  ],
};
