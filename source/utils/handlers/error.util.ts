import { NextFunction, Request, Response } from "express";
import { CustomException } from "../../types/errors";
import DaoException from "../../types/errors/DaoException";

export default function errorHandler(
  err: CustomException,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Handling DaoException
  if (err instanceof DaoException) {
    res.status(300).json({
      message: err.getMessage(),
    });
  }

  // General
  res.status(err.code || 500).json({
    message: err.message || "Server Error",
  });
  next();
}
