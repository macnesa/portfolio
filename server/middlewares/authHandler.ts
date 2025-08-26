import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/response';
import AppError from '../utils/AppError';
import jwt from "jsonwebtoken";
import { db } from '../db';
import { AuthService } from '../modules/auth/auth.service';
import isEmpty from 'lodash/isEmpty';

export function authHandler(required: boolean = true) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];
      // more check needed
      if (required && !token) {
        return sendResponse(res, false, 401, 'Access token required');
      } if (!required || !token) {
        return next();
      }
      
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
      (req as any).user = { id: payload.userId };
      
      // tcdbt
      const spotifyAccount = await db.selectFrom('spotify_accounts')
      .selectAll()
      .where('user_id', '=', payload.userId)
      .executeTakeFirst();
      
      if(spotifyAccount) {
        let {access_token, expires_in} = spotifyAccount;
        const now = new Date();
        
        if (!expires_in || new Date(expires_in) <= now) {
          try {
            const refreshed = await AuthService.refreshSpotifyToken(spotifyAccount.refresh_token!); // #tcdbt
            
            await db.updateTable('spotify_accounts').set({
              access_token: refreshed.access_token,
              expires_in: new Date(Date.now() + refreshed.expires_in * 1000),
              ...(refreshed.refresh_token ? { refresh_token: refreshed.refresh_token } : {}) // refresh_token bisa muncul at any time
            }).where('user_id', '=', payload.userId).execute();
            
            (req as any).spotifyAccessToken = refreshed.access_token;
          } catch (error) {
            console.error('Failed to refresh Spotify token:', error);
            return sendResponse(res, false, 401, 'Spotify access token expired and refresh failed');
          }
        } else {
          (req as any).spotifyAccessToken = spotifyAccount.access_token;
        }
      }
      
      next();
    } catch (error) {
      return sendResponse(res, false, 401, 'Invalid access token')
    }
  };
} 