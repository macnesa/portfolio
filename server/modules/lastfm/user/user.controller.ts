import axios from 'axios';
import z from 'zod';
import { BaseController } from '../../../core/base.controller'
import { Request, Response, NextFunction } from 'express'; 
import { buildSig } from '../../../utils/auth';
import { NoAuth } from '../../../decorators/NoAuth';

export default class userController extends BaseController {
  
  constructor() {
    super();
  }
  async index(req: Request, res: Response, next:NextFunction) {
    this.sendSuccess(res, { desc: "This is the User route" });
  }
  
  async getScrobbleTimeLastYear(req: Request, res: Response, next:NextFunction) {
    const now = new Date();
    
    // Hitung rentang minggu lalu (Minggu sampai Sabtu)
    const endOfLastWeek = new Date(now);
    endOfLastWeek.setDate(now.getDate() - now.getDay()); // Minggu ini
    endOfLastWeek.setSeconds(-1); // Akhir Sabtu minggu lalu

    const startOfLastWeek = new Date(endOfLastWeek);
    startOfLastWeek.setDate(endOfLastWeek.getDate() - 6); // Awal Minggu minggu lalu
    startOfLastWeek.setHours(0, 0, 0, 0);

    const from = Math.floor(startOfLastWeek.getTime() / 1000).toString();
    const to = Math.floor(endOfLastWeek.getTime() / 1000).toString();

    const params: Record<string, string> = {
      method: 'user.getRecentTracks',
      user: (req as any).lastfm.user,
      api_key: this.lastFmKey,
      sk: (req as any).lastfm.session_key,
      from,
      to,
      limit: '1',
    };

    const api_sig = buildSig(params, this.lastFmSecret);
    const requestParams = {
      ...params,
      api_sig,
      format: 'json',
    };

    const { data } = await axios.get(this.LASTFM_API, { params: requestParams });

    const total = parseInt(data?.recenttracks?.['@attr']?.total ?? '0', 10);

    this.sendSuccess(res, {
      total,
      from: startOfLastWeek.toISOString(),
      to: endOfLastWeek.toISOString(),
    });
  }
  
  
  
  
  async getRecentTracks(req: Request, res: Response, next:NextFunction) {
     
  }

  
}


