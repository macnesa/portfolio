import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const redirectTo = req.nextUrl.searchParams.get("redirectTo") || "/";
  
  const response = await fetch(`${process.env.SERVER_URL}/auth/getInjectCookie`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();

  const token = data.data.token;

  const res = NextResponse.redirect(redirectTo);
  if (token) {
    res.cookies.set("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }
  return res;
}
