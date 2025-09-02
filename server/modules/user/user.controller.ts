import axios from 'axios';
import z from 'zod';
import { BaseController } from '../../core/base.controller'
import { Request, Response, NextFunction } from 'express';
import { topTracksSchema } from '../../schemas/spotify/topTracks.schema';
import { topArtistsSchema } from '../../schemas/spotify/topArtists.schema';
import { db } from '../../db';
// import { UserService } from './user.service';

export default class userController extends BaseController {
  
  constructor() {
    super();
  }
  
  async index(req: Request, res: Response, next:NextFunction) {
    this.sendSuccess(res, { desc: "This is the User route" });
  }
  
  async getMe(req: Request, res: Response, next:NextFunction) {
    let user = (req as any).user;
    
    const [me, spotify_accounts] = await Promise.all([
      db.selectFrom('users').select(['username','id']) .where('id', '=', user.id).executeTakeFirst(),
      db.selectFrom('spotify_accounts').select(['id','avatar_url', 'display_name']) .where('user_id', '=', user.id).executeTakeFirst(),
    ]);
     
    this.sendSuccess(res, {...me, spotify_accounts : spotify_accounts ?? null})
  }
  
}