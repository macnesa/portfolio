import axios from 'axios';
import { BaseController } from '../../core/base.controller'
import { Request, Response, NextFunction } from 'express';
export default class userController extends BaseController {
  
  constructor() {
    super();
  }
  async index(req: Request, res: Response, next:NextFunction) {
    this.sendSuccess(res, { desc: "This is the User route" });
  }
  
  /* :type -> artists | tracks */
  async getTopByType(req: Request, res: Response, next:NextFunction) {
    let url = `${this.SPOTIFY_API}/me/top/${req.params['type']}`;
    
    const limit = req.query.limit; 
    if (limit) url += `?limit=${limit}`;
    
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${(req as any).accessToken}`,
      },
    });
    this.sendSuccess(res, data)
  }
  
  // async getUser(req: Request, res: Response): Promise<any> {
  //   this.response(res, true, 200, 'Success', { desc: "Ini adalah route getUser" })
  // }
  
  // async getProfile(access_token: string): Promise<any> {
  //   try {
  //     const { data } = await axios({
  //       method: "get",
  //       url: "https://api.spotify.com/v1/me",
  //       headers: {
  //         Authorization: `Bearer ` + access_token,
  //       },
  //     });
  //     return data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}