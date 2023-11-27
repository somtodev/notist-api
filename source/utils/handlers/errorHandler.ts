import { NextFunction, Request, Response } from "express";
import { CustomException } from "../../types/errors";

export default function errorHandler(
  err: CustomException,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(err.code || 500).json({
    message: err.message || "Internal Server Error",
  });
  next();
}
