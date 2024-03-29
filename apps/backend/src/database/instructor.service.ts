import { makeToken, HttpError } from "./../utils"
import { compare, hash } from "../utils/cryptoService"
import { NextFunction, Request, Response } from "express"
import { execute } from "."

async function checkCredentials(req: Request, _: Response, next: NextFunction) {
  const { email, password } = req.body
  const params = [email]
  const statement = `
          SELECT "instructorId", "email", "hashedPassword"
          FROM instructor
          WHERE email = $1`

  const { rows } = await execute(statement, params)
  if (rows.length === 0) {
    throw new HttpError(401, "unknown email")
  }

  const { hashedPassword, instructorId } = rows[0]
  const isValidPassword = await compare(password, hashedPassword)
  if (isValidPassword) {
    const token = await makeToken({ instructorId })
    req.body = { ...req.body, ...rows[0], token }
    return next()
  } else {
    throw new HttpError(401, "wrong password")
  }
}

async function changeInstructorPassword(req: Request, res: Response) {
  const { newPassword, email } = req.body
  const hashedPassword = await hash(newPassword)
  const params = [hashedPassword, email]
  const statement = `
      UPDATE instructor 
      SET "hashedPassword" = $1 
      WHERE "email" = $2`

  await execute(statement, params)

  return res.status(204).send()
}

export { checkCredentials, changeInstructorPassword }
