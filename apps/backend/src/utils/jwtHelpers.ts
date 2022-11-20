import { appConfig, HttpError } from "./index.ts";
import * as djwt from "https://deno.land/x/djwt@v2.1/mod.ts";

const NOW = Math.floor(Date.now() / 1000);
const DAYS_IN_SECONDS = 86400;

export const makeToken = async (
  payload: { learnerId: number } | { instructorId: number },
  opts: djwt.Payload = {},
) => {
  const exp = NOW + appConfig.TOKEN_DURATION * DAYS_IN_SECONDS;

  try {
    const token = await djwt.create(
      { alg: "HS256" },
      { data: payload, exp, iat: NOW, ...opts },
      appConfig.TOKEN_SECRET,
    );
    return token;
  } catch (error) {
    throw new HttpError(500, `Error signing token ${error}`);
  }
};

export const verifyToken = (token: string) => {
  return djwt.verify(token, appConfig.TOKEN_SECRET, "HS256");
};
