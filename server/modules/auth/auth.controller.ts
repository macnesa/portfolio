import axios, { AxiosResponse } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../core/base.controller'
import { NoAuth } from '../../decorators/NoAuth';
import crypto from "crypto";
import { z } from 'zod'
import { UserService } from '../spotify/user/user.service';
import { db } from '../../db';
import { buildSig, hashPassword, comparePassword, generateJWT } from '../../utils/auth';
import jwt from "jsonwebtoken";
import snakeCase from "lodash/snakeCase";
import isEmpty from "lodash/isEmpty";


export default class authController extends BaseController {
  private get clientId(): string {
    if (!process.env.CLIENT_ID) throw new Error("Missing CLIENT_ID in env");
    return process.env.CLIENT_ID;
  }

  private get clientSecret(): string {
    if (!process.env.CLIENT_SECRET) throw new Error("Missing CLIENT_SECRET in env");
    return process.env.CLIENT_SECRET;
  }
  
  private get redirectUrl(): string {
    if (!process.env.SERVER_REDIRECT_URL) throw new Error("Missing SERVER_REDIRECT_URL in env");
    return process.env.SERVER_REDIRECT_URL;
  }
  
  private get clientUrl(): string {
    if (!process.env.CLIENT_URL) throw new Error("Missing CLIENT_URL in env");
    return process.env.CLIENT_URL;
  }
  

  
  private get lastFmCallBack(): string {
    if (!process.env.LASTFM_CALLBACK) throw new Error("Missing LASTFM_CALLBACK in env");
    return process.env.LASTFM_CALLBACK;
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
  
  setSpotifyCookies(res: Response, accessToken: string, refreshToken: string, expiresInSec: number) {
    const maxAgeAccess = expiresInSec * 1000; // ms
    const maxAgeRefresh = 30 * 24 * 60 * 60 * 1000; // 30 hari
    
    /** 
     * @be_careful_of_production_cross_origin !!
    */
    res.cookie("accessTokenSpotify", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: maxAgeAccess,
      path: "/",
    });
    // res.cookie("accessTokenExpiry", (Date.now() + maxAgeAccess).toString(), {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   maxAge: maxAgeAccess,
    //   path: "/",
    // });
    // if (refreshToken) {
    //   res.cookie("refreshToken", refreshToken, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "strict",
    //     maxAge: maxAgeRefresh,
    //     path: "/auth",
    //   });
    // }
  } 
  
  /** 
   * @be_careful_of_production_cross_origin !!
  */
  setUserCookies(res: Response, accessToken: string | number) {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      path: "/",
    });
  } 
  
  @NoAuth()
  async postManualSignIn(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    
    const user = await db.selectFrom('users').selectAll().where('email', '=', email).executeTakeFirst();
    if (!user) return this.error(next, 401, "Invalid credentials");
    const isValid = user.password_hash && await comparePassword(password, user.password_hash);
    if (!isValid) return this.error(next, 401, "Invalid credentials");
    
    const token = user.id && generateJWT(user.id);
    console.log("user token", token);
    if(token) this.setUserCookies(res, token); 
    
    this.sendSuccess(res, { desc: 'Sign In Success' })
  }
  
  @NoAuth()
  async postManualSignUp(req: Request, res: Response, next: NextFunction) {
    const { username, email, password } = req.body;
    const check = await db.selectFrom('users').selectAll().where('email', '=', email).executeTakeFirst();
    if (check) return this.error(next, 400, "Email already registered");
    
    const password_hash = await hashPassword(password);
    const newUser = await db.insertInto('users').values({
      username,
      email,
      password_hash
    }).returningAll().executeTakeFirst(); 
    
    if(newUser) {
      const token = newUser.id && generateJWT(newUser.id);
      if(token) this.setUserCookies(res, token);
    } else {
      return this.error(next, 500, "Failed to create user");
    }
    this.sendSuccess(res, { desc: 'Sign Up Success and Logged In' })
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
    const secondCall = await this.secondCall(code);
    const { access_token, refresh_token, expires_in } = secondCall.data;
    
    const profile = await UserService.getSpotifyProfile(access_token);
    
    let check = await db.selectFrom('spotify_accounts').selectAll().where('spotify_id', '=', profile.id).executeTakeFirst();
    let user;
    
    if (!check) {
      user = await db.insertInto('users').values({
          username: snakeCase(profile.display_name),
        }).returningAll().executeTakeFirst();
      if (!isEmpty(user)) {
        check = await db.insertInto('spotify_accounts').values({
          user_id: user.id!,
          spotify_id: profile.id,
          refresh_token,
          access_token,
          expires_in: new Date(Date.now() + expires_in * 1000),
          display_name: profile.display_name,
          avatar_url: profile.images[0]?.url || null,
        }).returningAll().executeTakeFirst();
      }
    } else {
      check = await db.updateTable('spotify_accounts').set({  
        access_token,
        expires_in: new Date(Date.now() + expires_in * 1000),
        updated_at: new Date()
      }).where('spotify_id', '=', check.spotify_id).returningAll().executeTakeFirst();
    }
    
    const id = check?.user_id ?? user?.id;
    
    const token = generateJWT(id!);
    console.log("userToken", token);
    
    this.setUserCookies(res, token!); 
    // this.setSpotifyCookies(res, access_token, refresh_token, Number(expires_in));
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
    // this.setSpotifyCookies(res, access_token, refresh_token || refreshToken, Number(expires_in));
  
    const redirectTo = req.query.redirect_to as string;
    if (redirectTo) {
      return res.redirect(`${this.clientUrl}${redirectTo}`);
    }
    this.sendSuccess(res, { desc: 'Refresh Token Request has been succesfully executed' })
  }; 
  
  @NoAuth()
  async getLoginLastfm(req: Request, res: Response) {
    const url = `${this.LASTFM_AUTH}/auth?api_key=${this.lastFmKey}&cb=${encodeURIComponent(this.lastFmCallBack)}`
    res.redirect(url);
  } 
  
  @NoAuth()
  async getRedirectLastFm(req: Request, res: Response, next: NextFunction) {
    const { token } = req.query as { token?: string };
    if (!token) return this.error(next, 400, "Missing token");
    
    const params = {
      method: 'auth.getSession',
      api_key: this.lastFmKey,
      token,
    };
    
    const api_sig = buildSig(params, this.lastFmSecret);
    const paramsToSend = { ...params, api_sig, format: 'json' };
    
    const { data } = await axios.get('https://ws.audioscrobbler.com/2.0/', {
      params: paramsToSend
    });
    
    console.log("last fm session key", data);
    

    res.redirect(this.clientUrl);
  }
  
}



 