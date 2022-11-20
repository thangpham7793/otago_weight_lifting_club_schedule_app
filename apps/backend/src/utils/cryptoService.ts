import {
  randomBytes,
  scrypt as callbackScrypt,
} from "https://deno.land/std@0.110.0/node/crypto.ts";
import { promisify } from "https://deno.land/std@0.110.0/node/util.ts";
import { Buffer } from "https://deno.land/std@0.131.0/node/buffer.ts";

// source: https://stackoverflow.com/questions/19822643/what-is-an-alternative-for-bcrypt-to-use-with-node

// Pass the password string and get hashed password back
// ( and store only the hashed string in your database)
const scrypt = promisify(callbackScrypt);

const encryptPassowrd = async (password: string, salt: string) => {
  const encrypted = (await scrypt(password, salt, 32)) as Buffer;

  return encrypted.toString("hex");
};

/**
 * Hash password with random salt
 * @return {Promise<string>} password hash followed by salt
 *  XXXX till 64 XXXX till 32
 */
export const hash = async (password: string): Promise<string> => {
  // Any random string here (ideally should be atleast 16 bytes)
  const salt = randomBytes(16).toString("hex");
  return (await encryptPassowrd(password, salt)) + salt;
};

/**
 * Match password against the stored hash
 */
export const compare = async (password: string, hash: string) => {
  const salt = hash.slice(64);
  const originalPassHash = hash.slice(0, 64);
  const currentPassHash = await encryptPassowrd(password, salt);
  return originalPassHash === currentPassHash;
};
