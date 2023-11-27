import config from "config";
import { sign } from "jsonwebtoken";

export { generateToken };

function generateToken(object: Object): string {
  const token = sign(object, config.get<string>("ACCESS_TOKEN_SECRET"));
  return token;
}
