import { NextResponse, type NextRequest } from "next/server";

import { basicAuthFromEnv, isAuthorized } from "@/lib/basic-auth";

/**
 * Password protection for staging and previews on Vercel (task T50). Does nothing unless
 * BASIC_AUTH_USER and BASIC_AUTH_PASSWORD are set, which they never are on the production VPS.
 */
export function proxy(request: NextRequest) {
  const credentials = basicAuthFromEnv();
  if (!credentials) return NextResponse.next();
  if (isAuthorized(request.headers.get("authorization"), credentials)) return NextResponse.next();

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="bX Technologies staging", charset="UTF-8"',
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  // Everything except build assets and the health check (used by uptime monitors).
  matcher: ["/((?!_next/static|_next/image|api/health).*)"],
};
