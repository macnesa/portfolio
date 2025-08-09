import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const acceptHeader = req.headers.get('accept') || '';
  if (!acceptHeader.includes('text/html')) return NextResponse.next(); 
  
  const { pathname } = req.nextUrl;
  if (pathname === "/login") return NextResponse.next(); 
  
  const accessToken = req.cookies.get("accessToken")?.value;
  const accessExpiry = req.cookies.get("accessTokenExpiry")?.value;
  
  if (!accessToken || !accessExpiry) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (Date.now() > Number(accessExpiry)) {
    const refreshUrl = new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`, req.url);
    refreshUrl.searchParams.set("redirect_to", pathname);
    return NextResponse.redirect(refreshUrl);
  }
   
  return NextResponse.next();
}

export const config = {
  // matcher: ["/dashboard/:path*", "/library/:path*", "/player/:path*"],
  matcher: "/:path*",
};
