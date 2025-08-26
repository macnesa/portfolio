import axios from 'axios';
import { BaseController } from '../../../core/base.controller'
import { Request, Response, NextFunction } from 'express';

export default class playerController extends BaseController {
  
  constructor() {
    super();
  }
  
  async index(req: Request, res: Response, next:NextFunction) {
    this.response(res, true, 200, 'Success', { desc: "This is Rachmunu route" })
  }
  
  async getCurrentlyPlaying(req: Request, res: Response, next:NextFunction) {
    const limit = req.query.limit; 
    
    let url = `${this.SPOTIFY_API}/me/player/currently-playing`;
    if (limit) url += `?limit=${limit}`;
    
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${(req as any).spotifyAccessToken}`,
      },
    });
    this.sendSuccess(res, data)
  }
}