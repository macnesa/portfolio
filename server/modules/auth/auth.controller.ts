import axios, { AxiosResponse } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../core/base.controller'
import { redirectSchema } from '../../schemas/zod.schema';
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
    if (!process.env.CLIENT_REDIRECT_URL) throw new Error("Missing CLIENT_REDIRECT_URL in env");
    return process.env.CLIENT_REDIRECT_URL;
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
  
  async index(req: Request, res: Response, next:NextFunction) {
    this.response(res, true, 200, 'Success', { desc: "This is Auth route" })
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
  
  getLogin(req: Request, res: Response) {
    console.log("vetaher");

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
  
  async getRedirect(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      // const parsed = redirectSchema.safeParse(req.query);
      // const { code, state } = req.query;
      // const savedState = req.cookies.oauthState;
      const code = String(req.query.code || '') ;
      const token = await this.secondCall(code);
      const { access_token, refresh_token, expires_in } = token;
      
      this.setAuthCookies(res, access_token, refresh_token, Number(expires_in));
      res.clearCookie("oauthState");
      
      
      // const xx = await token.json()
      // console.log(token);
      
      
      // if (!parsed.success) {
      //   this.response(res, false, 400, 'Failed', null, z.treeifyError(parsed.error))
      //   return;
      // }
      // const { code } = parsed.data;
      // const data = token.data.access_token;
      // res.redirect(`${this.clientUrl}/?token=${data}`);
      
    } catch (error) {
      next(error);
    }
  }
  
  async secondCall(code: string): Promise<any> {
    try {
      const body = new URLSearchParams({
        code,
        redirect_uri: `${this.redirectUrl}`,
        grant_type: "authorization_code",
      });
      const req: AxiosResponse<any> = await axios.post(
        `${this.SPOTIFY_AUTH}/api/token`,
        body.toString(),
        {
          headers: {
            Authorization: this.spotifyBuffer,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      return req;
    } catch (error) {
      throw error;
    }
  }
  
  async status(req: Request, res: Response) {
    const accessToken = req.cookies.accessToken;
    const accessExpiry = Number(req.cookies.accessTokenExpiry);
    const hasAccess = typeof accessToken === "string" && accessToken.trim() !== "" && !Number.isNaN(accessExpiry) && Date.now() < accessExpiry;
    this.response(res, true, 200, 'Success', { loggedIn: hasAccess })
  }
  
}

