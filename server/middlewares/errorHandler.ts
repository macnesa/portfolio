import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { ErrorByNumber } from "../constants/errorByNumber";
import { ErrorByName } from "../constants/errorByName";
import { sendResponse } from "../utils/response";

export default function errorHandler( err: Error, req: Request, res: Response, _next: NextFunction ) {
  const status = err instanceof AppError ? err.statusCode : ErrorByName[err.name] ?? 500;
  if (status >= 500) {
    console.error(err);
  }
  const message = err.message && err.message !== "Error"
    ? err.message
    : ErrorByNumber[status]?.message ?? "Internal Server Error";

  return sendResponse(res, false, status, message);
}
