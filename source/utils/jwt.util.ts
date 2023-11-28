import config from "config";
import { sign } from "jsonwebtoken";

function generateToken(object: Object): string {
  const token = sign(object, config.get<string>("ACCESS_TOKEN_SECRET"), {
    expiresIn: config.get<string>("ACCESS_TOKEN_TIME"),
  });
  return token;
}

export { generateToken };
