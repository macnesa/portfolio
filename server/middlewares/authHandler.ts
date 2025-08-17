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