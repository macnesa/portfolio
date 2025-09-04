import axios, { AxiosResponse } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../core/base.controller'
import { NoAuth } from '../../decorators/NoAuth';
import crypto from "crypto";
import { z } from 'zod'
import { UserService as UserServiceSpotiy} from '../spotify/user/user.service';
import { UserService as UserServiceWakatime} from '../wakatime/user/user.service';
import { UserService as UserServiceLastfm} from '../lastfm/user/user.service';
import { db } from '../../db';
import { buildSig, hashPassword, comparePassword, generateJWT } from '../../utils/auth';
import jwt from "jsonwebtoken";
import snakeCase from "lodash/snakeCase";
import isEmpty from "lodash/isEmpty";
import isObject from "lodash/isObject";


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
  
  private get wakatimeCallBack(): string {
    if (!process.env.WAKATIME_CALLBACK) throw new Error("Missing WAKATIME_CALLBACK in env");
    return process.env.WAKATIME_CALLBACK;
  }
  
  
  private get spotifyBuffer(): string {
    const raw = `${this.clientId}:${this.clientSecret}`;
    return `Basic ${Buffer.from(raw).toString("base64")}`;
  }
  
  constructor() {
    super();
  }
  
  @NoAuth()
  async index(req: Request,  res: Response, next:NextFunction) {
    this.sendSuccess(res, { desc: "This is the Auth route" });
  }
  
  generateState(length = 16) {
    return crypto.randomBytes(length).toString("hex");
  }
   
  setUserCookies(res: Response, accessToken: string | number) {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: (process.env.SAME_SITE as any) || "strict",
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
      sameSite: (process.env.SAME_SITE as any) || "strict",
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
      return this.error(next, 400, "Authorization code missing");
    }
    const secondCall = await this.secondCall(code);
    const { access_token, refresh_token, expires_in } = secondCall.data;
    
    const profile = await UserServiceSpotiy.getProfile(access_token);
    let check = await db.selectFrom('spotify_accounts').selectAll().where('id', '=', profile.id).executeTakeFirst();
    let user : any = null;
    
    if(!isEmpty((req as any)?.user)) {
      user = await db.selectFrom('users').where('id', '=', (req as any).user.id).selectAll().executeTakeFirst();
    }
    
    if (!check) { 
      if(!user) {
        user = await db.insertInto('users').values({
          username: snakeCase(profile.display_name),
        }).returningAll().executeTakeFirst(); 
      } 
      if (user) {
        check = await db.insertInto('spotify_accounts').values({
          id: profile.id,
          user_id: user.id,
          refresh_token,
          access_token,
          expires_in: new Date(Date.now() + expires_in * 1000),
          display_name: profile.display_name,
          avatar_url: profile.images[0]?.url || null,
        }).returningAll().executeTakeFirst();
      }
    } else {
      check = await db.updateTable('spotify_accounts').set({  
        refresh_token,
        access_token,
        expires_in: new Date(Date.now() + expires_in * 1000),
        updated_at: new Date()
      }).where('id', '=', check.id).returningAll().executeTakeFirst();
    }
    
    
    const token = generateJWT(user?.id);
    this.setUserCookies(res, token); 
    
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
    
    const { data } = await axios.get(this.LASTFM_API, {
      params: paramsToSend
    });
    const session = data?.session;
    if (!session || !session.key || !session.name) {  
      return this.error(next, 400, "Invalid session data from Last.fm");
    }
    
    const profile = await UserServiceLastfm.getProfile(session.key);
    let check = await db.selectFrom('lastfm_accounts').selectAll().where('id', '=', profile.id).executeTakeFirst();
    let user : any = null;
    
    if(!isEmpty((req as any)?.user)) {
      user = await db.selectFrom('users').where('id', '=', (req as any).user.id).selectAll().executeTakeFirst();
    }
    
    if (!check) { 
      if(!user) {
        user = await db.insertInto('users').values({
          username: snakeCase(profile.display_name),
        }).returningAll().executeTakeFirst(); 
      } 
      if (user) {
        check = await db.insertInto('lastfm_accounts').values({
          id: profile?.user.name,
          user_id: user.id,
          session_key: session.key,
          display_name: profile?.user.realname,
          avatar_url: (profile?.user.image || []).find((img: { size: string; ['#text']: string })=> img.size === 'large')?.['#text'] || null,
        }).returningAll().executeTakeFirst();
      }
    } else {
      check = await db.updateTable('lastfm_accounts').set({  
        session_key: session.key,
        updated_at: new Date()
      }).where('id', '=', check.id).returningAll().executeTakeFirst();
    }
    
    const jwt = generateJWT(user?.id);
    this.setUserCookies(res, jwt);
    res.redirect(this.clientUrl);
  }
  
  @NoAuth() 
  async getLoginWakatime(req: Request, res: Response) {
    const state = this.generateState();
    const scopes = [
      "read_stats",
      "read_summaries",
      "read_heartbeats",
      "read_goals",
      "read_private_leaderboards",
      "email"
    ];
    const scopeParam = encodeURIComponent(scopes.join(" "));
    const url = `https://wakatime.com/oauth/authorize?client_id=${this.wakatimeId}&response_type=code&redirect_uri=${encodeURIComponent(this.wakatimeCallBack)}&scope=${scopeParam}&state=${state}`;
    
    res.cookie("oauthState", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: (process.env.SAME_SITE as any) || "strict",
      maxAge: 5 * 60 * 1000,
      path: "/",
    });
    
    res.redirect(url);
  }
  
  @NoAuth() 
  async getRedirectWakatime(req: Request, res: Response, next: NextFunction) {
    const code = req.query.code as string;
    const savedState = req.cookies.oauthState; ///tcdbt
    
    if (!code) {
      return this.error(next, 400, "Authorization code missing");
    }
    
    
    const { data } = await axios.post(`${this.WAKATIME_AUTH}/token`, {
      client_id: this.wakatimeId,
      client_secret: this.wakatimeSecret,
      redirect_uri: this.wakatimeCallBack,
      grant_type: 'authorization_code',
      code,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
     
    const { access_token, refresh_token, expires_in } = typeof data === 'object' ? data : Object.fromEntries(new URLSearchParams(String(data)));
    
    
    const profile = await UserServiceWakatime.getProfile(access_token);
    
    let check = await db.selectFrom('wakatime_accounts').selectAll().where('id', '=', profile.id).executeTakeFirst();
    let user : any = null;
    if(!isEmpty((req as any)?.user)) {
      user = await db.selectFrom('users').where('id', '=', (req as any).user.id).selectAll().executeTakeFirst();
    }
    
    if (!check) {
      if(!user) {
        user = await db.insertInto('users').values({
          username: snakeCase(profile.display_name),
        }).returningAll().executeTakeFirst();
      }
      if (user) {
        check = await db.insertInto('wakatime_accounts').values({
          id: profile.id,
          user_id: user.id,
          refresh_token,
          access_token,
          expires_in: new Date(Date.now() + expires_in * 1000),
          display_name: profile.display_name,
          avatar_url: profile.photo || null,
        }).returningAll().executeTakeFirst();
      }
    } else {
      check = await db.updateTable('wakatime_accounts').set({  
        refresh_token,
        access_token,
        expires_in: new Date(Date.now() + expires_in * 1000),
        updated_at: new Date()
      }).where('id', '=', check.id).returningAll().executeTakeFirst();
    }
    
    const token = generateJWT(user?.id);
    this.setUserCookies(res, token); 

    res.clearCookie("oauthState");
  
    res.redirect(this.clientUrl);
  }
  
  @NoAuth()
  async getInjectCookie(req: Request, res: Response, next: NextFunction) {
    const user = await db.selectFrom('users').selectAll().executeTakeFirst(); 
    if(user?.id) {
      const token = generateJWT(user.id);
      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: ".onrender.com", // penting: ini biar cookie dipakai untuk semua subdomain render.com
        path: "/",
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      });
      res.cookie("vercelAuth", "1", {
        httpOnly: false, // FE bisa baca
        secure: true,
        sameSite: "lax",
        domain: "macnesa.vercel.app",
        path: "/",
      });
      // return res.redirect(`${this.clientUrl}?accessToken=${token}`);
    }
    return res.redirect(this.clientUrl);
  }
}

 