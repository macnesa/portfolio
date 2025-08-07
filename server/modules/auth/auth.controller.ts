import axios, { AxiosResponse } from 'axios';
import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../core/base.controller'
import { redirectSchema } from '../../schemas/zod.schema';
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
  
  async getRedirect(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const parsed = redirectSchema.safeParse(req.query);
      if (!parsed.success) {
        this.response(res, false, 400, 'Failed', null, z.treeifyError(parsed.error))
        return;
      }
      const { code } = parsed.data;
      const token = await this.secondCall(code);
      const data = token.data.access_token;
      res.redirect(`${this.clientUrl}/?token=${data}`);
    } catch (error) {
      next(error);
    }
  }
  
  async secondCall(code: string): Promise<any> {
    try {
      const body = new URLSearchParams({
        code,
        redirect_uri: `${this.baseUrl}/redirect/`,
        grant_type: "authorization_code",
      });
      const req: AxiosResponse<any> = await axios.post(
        `${this.SPOTIFY_API}/token`,
        body,
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
}