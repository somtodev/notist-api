import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "config";
import { CustomException } from "../types/errors";

export { authorizedUser };

function authorizedUser(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) throw new CustomException(401, "Unauthorized");

  const token: string = authHeader.split(" ")[1];
  verify(token, config.get<string>("ACCESS_TOKEN_SECRET"), (err, user) => {
    if (err) throw new CustomException(403, "Forbidden");
    req.user = user;
    next();
  });
}
