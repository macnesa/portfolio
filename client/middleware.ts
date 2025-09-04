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
  
  const tokenFromQuery = url.searchParams.get("accessToken");
  if (tokenFromQuery) {
    const cleanUrl = new URL(path, req.url);
    const res = NextResponse.redirect(cleanUrl);
    res.cookies.set("accessToken", tokenFromQuery, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 hari
    });
    return res;
  }
  
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
