import { makeToken, httpError } from "./../utils/register"
import { compare, hash } from "bcrypt"
import { NextFunction, Request, Response } from "express"
import { execute } from "./register"

export class InstructorService {
  async checkCredentials(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body
    console.log(email, password)

    const params = [email]
    const statement = `    
          SELECT "instructorId", "email", "hashedPassword"
          FROM instructor
          WHERE email = $1`

    const { rows } = await execute(statement, params)

    //console.log(result.rows)
    if (rows.length === 0) {
      throw new httpError(401, "unknown email")
    }

    const { hashedPassword, instructorId } = rows[0]
    //TODO: check password here using jwt and bcrypt
    const isValidPassword = await compare(password, hashedPassword)
    if (isValidPassword) {
      //send programmeId to scheduleService.getAllProgrammes
      const token = await makeToken({ instructorId })
      req.body = { ...req.body, ...rows[0], token }
      next()
    } else {
      throw new httpError(401, "wrong password")
    }
  }

  async changeInstructorPassword(req: Request, res: Response) {
    const { newPassword, email } = req.body
    const hashedPassword = await hash(newPassword, 10)
    console.log("Received", req.body)
    const params = [hashedPassword, email]
    console.log("Sending", params)
    const statement = `
      UPDATE instructor 
      SET "hashedPassword" = $1 
      WHERE "email" = $2`

    await execute(statement, params)

    res.status(204).send()
  }
}
