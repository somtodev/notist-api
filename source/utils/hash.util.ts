import { compare, hashSync } from "bcrypt";
import config from "config";

export { hashPayload, verifyPayload };

const salt = config.get<number>("saltWorkFactor");

function hashPayload(payload: string): string {
  return hashSync(payload, salt);
}

async function verifyPayload(
  hashed: string,
  payload: string,
): Promise<boolean> {
  return compare(payload, hashed).catch((err) => {
    return false;
  });
}
