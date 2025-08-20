import axios from 'axios';
import z from 'zod';
import { BaseController } from '../../core/base.controller'
import { Request, Response, NextFunction } from 'express';
import { TopTracksSchema } from '../../schemas/spotify/topTracks.schema';
import { TopArtistsSchema } from '../../schemas/spotify/topArtists.schema';
export default class userController extends BaseController {
  
  constructor() {
    super();
  }
  async index(req: Request, res: Response, next:NextFunction) {
    this.sendSuccess(res, { desc: "This is the User route" });
  }
  
  /* :type -> artists | tracks */
  async getTopByType(req: Request, res: Response, next:NextFunction) {
    const type = req.params['type'];
    const limit = req.query['limit']; 
    const schemaMap = {
      artists: TopArtistsSchema,
      tracks: TopTracksSchema,
    } as const;
    
    if (!(type in schemaMap)) {
      return this.error(next, 400, "Invalid path parameter"); 
    }
    
    let url = `${this.SPOTIFY_API}/me/top/${type}`;
    if (limit) url += `?limit=${limit}`;
    
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${(req as any).accessToken}`,
      },
    });
    const schema = schemaMap[type as keyof typeof schemaMap];
    
    const parsed = schema.safeParse( data );
    if(!parsed.success) {
      return this.error(next, 502, 'Invalid response data from Spotify API', parsed.error.issues);
    } 
    this.sendSuccess(res, parsed.data)
  }
  
}