import { appConfig, HttpError } from "."
import jwt from "jsonwebtoken"
import path from "path"
import { config } from "dotenv"

config({ path: path.resolve(__dirname, "../.env") })

export const makeToken = async (
  payload: { learnerId: number } | { instructorId: number },
  opts: jwt.SignOptions & { secret?: string } = {}
) => {
  const { secret = appConfig.TOKEN_SECRET, ...signOptions } = opts
  const finalOpts = {
    expiresIn: `${appConfig.TOKEN_DURATION} days`,
    ...signOptions,
  }

  try {
    const token = jwt.sign({ data: payload }, secret, finalOpts)
    return token
  } catch (error) {
    throw new HttpError(500, `Error signing token ${error}`)
  }
}
