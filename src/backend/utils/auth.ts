import { httpError } from "./register"
import jwt from "jsonwebtoken"
import { Response, Request, NextFunction } from "express"

export const isEmail = (email: string): boolean => {
  const pattern = /^([\w_-]+|[\w_-]+(.[\w_-]+)+?)@([\w_-]+|[\w_-]+(.[\w_-]+)+?)$/
  return pattern.test(email)
}

export const checkEmail = (req: Request, res: Response, next: NextFunction) => {
  if (isEmail(req.body.email) === false) {
    return res.status(400).json({ message: "bad email format" })
  } else {
    next()
  }
}

export const extractHeaderAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`Receiving Auth Header as ${req.headers.authorization}`)

  const bearerToken = req.headers.authorization

  if (bearerToken && bearerToken.toLowerCase().startsWith("bearer ")) {
    try {
      const token = await jwt.verify(
        bearerToken.substring(7),
        process.env.SECRET
      )

      console.log(`The decoded token is ${JSON.stringify(token)}`)
      req.body = { ...req.body, token }
      next()
    } catch (error) {
      console.error(error)
      throw new httpError(500, `Error decoding verifying jwt token ${error}`)
    }
  } else {
    return res.status(401).json({ message: "Invalid or missing credentials!" })
  }
}
