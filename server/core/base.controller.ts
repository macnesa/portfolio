import { sendResponse } from "../utils/response"
import { Response, NextFunction } from "express"
import { SPOTIFY_API_BASE_URL, SPOTIFY_AUTH_BASE_URL } from "../constants/url";
import { ErrorByNumber } from "../constants/errorByNumber";
import AppError from "../utils/AppError";
export class BaseController {
  
  protected SPOTIFY_API = SPOTIFY_API_BASE_URL;
  protected SPOTIFY_AUTH = SPOTIFY_AUTH_BASE_URL;
  protected AppError = AppError;
  
  /**
   * Menghasilkan respons API standar.
   * @param {Object} res - Objek respons dari Express.js.
   * @param {boolean} success - Status permintaan.
   * @param {number} status - Kode status HTTP.
   * @param {string} message - Pesan untuk menjelaskan hasil permintaan.
   * @param {any} data - Data yang dikembalikan.
   * @param {string} [error] - Pesan error jika ada.
   */
  
  protected response<T = unknown>(
    res: Response,
    success: boolean,
    status: number,
    message: string,
    data: T | null = null
  ): void {
    sendResponse(res, success, status, message, data);
  }
  
  protected sendSuccess<T = unknown>(
    res: Response,
    data: T | null = null,
    statusCode: number = 200,
  ): void {
    const messageMap: Record<number, string> = {
      200: 'Success',
      201: 'Created',
      202: 'Accepted',
    };
    const message = messageMap[statusCode] ?? 'Success';
    this.response(res, true, statusCode, message, data);
  }
  
  protected error(
    next: NextFunction,
    statusCode: number,
    message?: string,
    errors?: any
  ): void {
    const errorDetail = ErrorByNumber[statusCode] ?? ErrorByNumber[500];
    const finalMessage = message && message.trim().length > 0 ? message : errorDetail.message;
    next(new AppError(errorDetail.status, finalMessage, errors));
  }
}