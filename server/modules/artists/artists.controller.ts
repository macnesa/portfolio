import axios from 'axios';
import z from 'zod';
import { BaseController } from '../../core/base.controller'
import { Request, Response, NextFunction } from 'express';
import { topTracksSchema } from '../../schemas/spotify/topTracks.schema';
import { topArtistsSchema } from '../../schemas/spotify/topArtists.schema';
import { artistSchema } from '../../schemas/spotify/artist.schema';
import { artistAlbumsSchema } from '../../schemas/spotify/artistAlbums.schema';
import { artistTopTracksSchema } from '../../schemas/spotify/artistTopTracks.schema';

export default class artistController extends BaseController {
  
  constructor() {
    super();
  }
  async index(req: Request, res: Response, next:NextFunction) {
    this.sendSuccess(res, { desc: "This is the Artist route" });
  }
  
  async getArtistById(req: Request, res: Response, next:NextFunction) {
    const id = req.params['id'];
    
    let url = `${this.SPOTIFY_API}/artists/${id}`;
    
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${(req as any).accessToken}`,
      },
    });
    
    const parsedApi = artistSchema.safeParse( data );
    if(!parsedApi.success) {
      return this.error(next, 502, 'Invalid response data from Spotify API', parsedApi.error.issues);
    } 
    this.sendSuccess(res, data)
  }
  
  async getAlbumsById(req: Request, res: Response, next:NextFunction) {
    const id = req.params['id'];
    
    let url = `${this.SPOTIFY_API}/artists/${id}/albums`;
    
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${(req as any).accessToken}`,
      },
    });
    
    const parsed = artistAlbumsSchema.safeParse( data );
    if(!parsed.success) {
      return this.error(next, 502, 'Invalid response data from Spotify API', parsed.error.issues);
    } 
    this.sendSuccess(res, parsed.data)
  }
  
  async getTopTracksById(req: Request, res: Response, next:NextFunction) {
    const id = req.params['id'];
    
    let url = `${this.SPOTIFY_API}/artists/${id}/top-tracks`;
    
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${(req as any).accessToken}`,
      },
    });
    
    const parsed = artistTopTracksSchema.safeParse( data );
    if(!parsed.success) {
      return this.error(next, 502, 'Invalid response data from Spotify API', parsed.error.issues);
    } 
    this.sendSuccess(res, parsed.data)
  }
  
}