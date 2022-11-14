import { appConfig, HttpError } from "."
import jwt from "jsonwebtoken"

export const makeToken = async (
  payload: { learnerId: number } | { instructorId: number },
  opts: jwt.SignOptions = {}
) => {
  const signOptions = {
    expiresIn: `${appConfig.TOKEN_DURATION} days`,
    ...opts,
  }

  try {
    const token = jwt.sign(
      { data: payload },
      appConfig.TOKEN_SECRET,
      signOptions
    )
    return token
  } catch (error) {
    throw new HttpError(500, `Error signing token ${error}`)
  }
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, appConfig.TOKEN_SECRET)
}
