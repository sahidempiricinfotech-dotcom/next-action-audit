import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Preserve the original value for the upstream proxy while avoiding duplicate
  // Origin headers added by the staging ingress.
  const headers = new Headers(request.headers);
  const origin = headers.get("origin");
  if (origin) {
    headers.set("x-forwarded-origin", origin);
    headers.delete("origin");
  }

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
