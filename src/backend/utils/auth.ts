import { Response, Request, NextFunction } from "express"

export const checkPassword = (
  password: string,
  hashed_password: string
): boolean => {
  return password === hashed_password
}

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
