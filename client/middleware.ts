import { NextRequest, NextResponse } from "next/server";

const guestPages = ["/login", "/register"];

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const path = url.pathname;

  const acceptHeader = req.headers.get("accept") || "";
  if (!acceptHeader.includes("text/html")) return NextResponse.next();
  if (req.nextUrl.pathname.startsWith("/api")) return NextResponse.next();

  const token = req.cookies.get("accessToken")?.value;
  console.log("galgalim", token);
  
  const isAuthenticated = Boolean(token);

  // if (isAuthenticated && guestPages.includes(path)) {
  //   url.pathname = "/";
  //   return NextResponse.redirect(url);
  // }

  if (!isAuthenticated && !guestPages.includes(path)) {
    // url.pathname = "/login";
    // return NextResponse.redirect(url);
    // url.pathname = "/api/getInjectCookie";
    // url.searchParams.set("redirectTo", path);
    const url = `${process.env.SERVER_URL}/auth/getInjectCookie`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // matcher: ["/dashboard/:path*", "/library/:path*", "/player/:path*"],
  matcher: "/:path*",
};
