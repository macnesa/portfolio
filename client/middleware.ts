import { NextRequest, NextResponse } from "next/server";

const guestPages = ["/login", "/register"];

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const path = url.pathname;
  const acceptHeader = req.headers.get("accept") || "";
  
  if (!acceptHeader.includes("text/html")) return NextResponse.next();
  if (req.nextUrl.pathname.startsWith("/api")) return NextResponse.next();
  
  const token = req.cookies.get("accessToken")?.value;
  const isAuthenticated = Boolean(token);
  
  if (isAuthenticated && guestPages.includes(path)) {
    
  }
  
  if (!isAuthenticated && !guestPages.includes(path)) {
    
  }
  
  return NextResponse.next();
}


export const config = {
  // matcher: ["/dashboard/:path*", "/library/:path*", "/player/:path*"],
  matcher: "/:path*",
};
