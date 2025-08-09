/**
 * Menghasilkan respons API standar.
 * @param {Object} res - Objek respons dari Express.js.
 * @param {boolean} success - Status permintaan.
 * @param {number} status - Kode status HTTP.
 * @param {string} message - Pesan untuk menjelaskan hasil permintaan.
 * @param {any} data - Data yang dikembalikan.
 * @param {string} [error] - Pesan error jika ada.
 */

import { Response } from "express";

export interface ApiResponse<T = any, E = any> {
  success: boolean;
  status: number;
  message: string;
  data?: T;
  error?: E;
}

export function sendResponse<T = any, E = any>(
  res: Response,
  success: boolean,
  status: number,
  message: string,
  data?: T,
  error?: E
): void {
  const response: ApiResponse<T, E> = { success, status, message };

  if (data !== undefined && data !== null) response.data = data;
  if (error !== undefined && error !== null) response.error = error;

  res.status(status).json(response);
}
