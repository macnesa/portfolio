import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/response';
import AppError from '../utils/AppError';

export function authHandler(required: boolean = true) {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];

    // more check needed
    if (required && !token) {
      return sendResponse(res, false, 401, 'Access token required');
    } 

    (req as any).accessToken = token;
    next();
  };
}

// vatuh {
//   access_token: 'BQD1gzOQQX0cI3TEmT1vArkAoa8tAlyTp5twpIc-sfwwkwhjuQ6fAfhlFb2NDH1FjIp_Z8eOayms81XB1XFCyz2MTVfW5RZL1yvNqMA4lF7lywjMIooaclVnrF7hGG0rKhU3115CI5umO4l488teIuVDJ29ZGAEHUfmteiGNPtHnkaO7JXtHq1ufM2jJ5js_iXMxU8ZMVoNGfqZk_PGMghH7iAw1EYWqfIoK6luzsNH_kUoVKBAmAdGRQlfc9HffyFCiw49NEw',
//   token_type: 'Bearer',
//   expires_in: 3600,
//   refresh_token: 'AQCb8jeo9JYKosdHHp23iuGJwQszAOYHzHaMKQDdhKbIIsN2J9zjiFnD17YjxgZn3ByAf_o2fCLogHwlisYVijW-mPC-HzPALFizXedII6iP4VTsYRtFQ7vSHZSXmiK2rN4',
//   scope: 'user-modify-playback-state user-read-playback-state user-read-currently-playing user-read-recently-played user-top-read user-read-private'
// }