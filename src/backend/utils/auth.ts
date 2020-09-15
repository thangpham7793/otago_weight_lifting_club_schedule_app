import { Response, Request, NextFunction } from "express"
import { compare, hash } from "bcrypt"

// export const checkPassword = async (
//   password: string,
//   hashedPassword: string
// ): Promise<Boolean> => {
//   return await compare(password, hashedPassword)
// }

// export const hashPassword = async (password: string): Promise<string> => {
//   return await hash(password, 10)
// }

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
