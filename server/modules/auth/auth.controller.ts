import axios, { AxiosResponse } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../core/base.controller'
import { redirectSchema } from '../../schemas/zod.schema';
import { NoAuth } from '../../decorators/NoAuth';
import crypto from "crypto";
import { z } from 'zod'

export default class authController extends BaseController {
  private get clientId(): string {
    if (!process.env.CLIENT_ID) throw new Error("Missing CLIENT_ID in env");
    return process.env.CLIENT_ID;
  }

  private get clientSecret(): string {
    if (!process.env.CLIENT_SECRET) throw new Error("Missing CLIENT_SECRET in env");
    return process.env.CLIENT_SECRET;
  }
  
  private get baseUrl(): string {
    if (!process.env.BASEURL) throw new Error("Missing BASEURL in env");
    return process.env.BASEURL;
  }
  
  private get clientUrl(): string {
    if (!process.env.CLIENT_URL) throw new Error("Missing CLIENT_URL in env");
    return process.env.CLIENT_URL;
  }
  
  private get redirectUrl(): string {
    if (!process.env.SERVER_REDIRECT_URL) throw new Error("Missing SERVER_REDIRECT_URL in env");
    return process.env.SERVER_REDIRECT_URL;
  }
  
  private get spotifyBuffer(): string {
    const raw = `${this.clientId}:${this.clientSecret}`;
    return `Basic ${Buffer.from(raw).toString("base64")}`;
  }
  
  constructor() {
    super();
  }
  
  async index(req: Request,  res: Response, next:NextFunction) {
    this.sendSuccess(res, { desc: "This is the Auth route" });
  }
  
  generateState(length = 16) {
    return crypto.randomBytes(length).toString("hex");
  }
  
  setAuthCookies(res: Response, accessToken: string, refreshToken: string, expiresInSec: number) {
    const maxAgeAccess = expiresInSec * 1000; // ms
    const maxAgeRefresh = 30 * 24 * 60 * 60 * 1000; // 30 hari
    
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: maxAgeAccess,
      path: "/",
    });
    res.cookie("accessTokenExpiry", (Date.now() + maxAgeAccess).toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: maxAgeAccess,
      path: "/",
    });
    if (refreshToken) {
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: maxAgeRefresh,
        path: "/auth",
      });
    }
  }
  
  @NoAuth()
  getLogin(req: Request, res: Response) {
    const state = this.generateState();
    res.cookie("oauthState", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 5 * 60 * 1000, // 5 menit
      path: "/",
    });
    
    const scope = ["user-top-read", "user-read-private", "user-read-recently-played","user-read-currently-playing", "user-modify-playback-state", "user-read-playback-state"].join(" ");
    
    const params = new URLSearchParams({
      response_type: "code",
      client_id: this.clientId,
      scope,
      redirect_uri: this.redirectUrl,
      state,
    });
    res.redirect(`${this.SPOTIFY_AUTH}/authorize?${params.toString()}`)
  }
  
  @NoAuth()
  async getRedirect(req: Request, res: Response, next: NextFunction): Promise<any> {
    const code = String(req.query.code || "");
    const state = String(req.query.state || "");
    const savedState = req.cookies.oauthState;
  
    if (!code || !state || state !== savedState) {
      return this.error(next, 400, "Invalid state or code");
    }
  
    const token = await this.secondCall(code);
    const { access_token, refresh_token, expires_in } = token.data;
    
    console.log("vatuh", token.data);
    
  
    this.setAuthCookies(res, access_token, refresh_token, Number(expires_in));
    res.clearCookie("oauthState");
  
    res.redirect(this.clientUrl);
  }
  
  async secondCall(code: string): Promise<any> {
    const body = new URLSearchParams({
      code,
      redirect_uri: this.redirectUrl,
      grant_type: "authorization_code",
    });
    const req = await axios.post(
      `${this.SPOTIFY_AUTH}/api/token`,
      body.toString(),
      {
        headers: {
          Authorization: this.spotifyBuffer,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return req;
  }
  
  async getRefresh(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return this.error(next, 401, 'Refresh token missing, please login again');
    }
  
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });
    const fetch = await axios.post(
      `${this.SPOTIFY_AUTH}/api/token`,
      body.toString(),
      {
        headers: {
          Authorization: this.spotifyBuffer,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  
    if (fetch.data.error) {
      // res.clearCookie("accessToken");
      // res.clearCookie("accessTokenExpiry");
      // res.clearCookie("refreshToken");
      return this.error(next, 401, 'Refresh token invalid or expired, please login again');
    }
  
    const { access_token, expires_in, refresh_token } = fetch.data;
    this.setAuthCookies(res, access_token, refresh_token || refreshToken, Number(expires_in));
  
    const redirectTo = req.query.redirect_to as string;
    if (redirectTo) {
      return res.redirect(`${this.clientUrl}${redirectTo}`);
    }
    this.sendSuccess(res, { desc: 'Refresh Token Request has been succesfully executed' })
  };
  
  async status(req: Request, res: Response) {
    const accessToken = req.cookies.accessToken;
    const accessExpiry = Number(req.cookies.accessTokenExpiry);
    const hasAccess = typeof accessToken === "string" && accessToken.trim() !== "" && !Number.isNaN(accessExpiry) && Date.now() < accessExpiry;
    this.sendSuccess(res, { loggedIn: hasAccess });
  }
  
}

