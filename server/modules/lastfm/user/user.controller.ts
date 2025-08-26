import axios from 'axios';
import z from 'zod';
import { BaseController } from '../../../core/base.controller'
import { Request, Response, NextFunction } from 'express'; 
import { buildSig } from '../../../utils/auth';

export default class userController extends BaseController {
  
  constructor() {
    super();
  }
  async index(req: Request, res: Response, next:NextFunction) {
    this.sendSuccess(res, { desc: "This is the User route" });
  }
  
  async getRecentTracks(req: Request, res: Response, next:NextFunction) {
    
    const params: Record<string, string> = {
      method: 'user.getRecentTracks ',
      user: 'michaelusty',
      api_key: this.lastFmKey,
      sk: '6WWXEW1CeiqM2adC73PSjClqQYGS3de5',
    };
  
    const api_sig = buildSig(params, this.lastFmSecret);
    
    const requestParams = {
      ...params,
      api_sig,
      format: 'json',
    };
    
    const { data } = await axios.get(this.LASTFM_API, { params: requestParams });
    this.sendSuccess(res, data)    
  }

  
}