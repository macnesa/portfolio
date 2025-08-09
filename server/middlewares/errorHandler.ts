import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { ErrorByNumber } from "../constants/errorByNumber";
import { ErrorByName } from "../constants/errorByName";
import { sendResponse } from "../utils/response";

export default function errorHandler( err: Error, req: Request, res: Response, _next: NextFunction ) {
  console.error(err);

  // Jika sudah instance AppError, langsung pakai statusCode dan pesan-nya
  if (err instanceof AppError) {
    return sendResponse(res, false, err.statusCode, err.message);
  }

  // Ambil status code berdasarkan nama error (jika ada mapping)
  const status = ErrorByName[err.name] ?? 500;

  // Pesan prioritas: pesan error instance > pesan katalog berdasarkan status > default string
  const message =
    err.message && err.message !== "Error"
      ? err.message
      : ErrorByNumber[status]?.message ?? "Internal Server Error";

  return sendResponse(res, false, status, message);
}
