import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const response = await fetch(`${process.env.SERVER_URL}/auth/getInjectCookie`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();

  const token = data.data.token;
  const redirectTo = data.redirectTo || "/";

  const url = new URL(redirectTo, req.url); 
  
  const res = NextResponse.redirect(url);
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
