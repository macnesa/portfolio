import axios from 'axios';
import z from 'zod';
import { BaseController } from '../../../core/base.controller'
import { Request, Response, NextFunction } from 'express';
import { albumSchema } from '../../../schemas/spotify/album.schema';
import { albumTracksSchema } from '../../../schemas/spotify/albumTracks.schema';
import { NoAuth } from '../../../decorators/NoAuth';

export default class albumsController extends BaseController {
  
  constructor() {
    super();
  }
  @NoAuth()
  async index(req: Request, res: Response, next:NextFunction) {
    this.sendSuccess(res, { desc: "This is the Albums route" });
  }
  
  async getAlbumById(req: Request, res: Response, next:NextFunction) {
    const id = req.params['id'];
    
    let url = `${this.SPOTIFY_API}/albums/${id}`;
    
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${(req as any).spotifyAccessToken}`,
      },
    });
    
    const parsed = albumSchema.safeParse( data );
    if(!parsed.success) {
      return this.error(next, 502, 'Invalid response data from Spotify API', parsed.error.issues);
    } 
    
    this.sendSuccess(res, parsed.data  )
  }
  
  async getTracksById(req: Request, res: Response, next:NextFunction) {
    const id = req.params['id'];
    
    let url = `${this.SPOTIFY_API}/albums/${id}/tracks`;
    
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${(req as any).spotifyAccessToken}`,
      },
    });
    
    const parsed = albumTracksSchema.safeParse( data );
    if(!parsed.success) {
      return this.error(next, 502, 'Invalid response data from Spotify API', parsed.error.issues);
    } 
    
    this.sendSuccess(res, parsed.data)
  }
  
  
}