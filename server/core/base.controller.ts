import { sendResponse } from "../utils/response"
import { Response } from "express"
import { SPOTIFY_API_BASE_URL } from "../constants/constants";

export class BaseController {
  
  protected SPOTIFY_API = SPOTIFY_API_BASE_URL;
  
  /**
   * Menghasilkan respons API standar.
   * @param {Object} res - Objek respons dari Express.js.
   * @param {boolean} success - Status permintaan.
   * @param {number} status - Kode status HTTP.
   * @param {string} message - Pesan untuk menjelaskan hasil permintaan.
   * @param {any} data - Data yang dikembalikan.
   * @param {string} [error] - Pesan error jika ada.
   */
  protected response<T = unknown, E = unknown>(
    res: Response,
    success: boolean,
    status: number,
    message: string,
    data: T = null as T,
    error: E = null as E
  ): void {
    sendResponse<T, E>(res, success, status, message, data, error);
  }

}