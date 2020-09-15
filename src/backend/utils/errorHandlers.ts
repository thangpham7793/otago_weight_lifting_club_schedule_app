import jwt from "jsonwebtoken"
import path from "path"
import { config } from "dotenv"
import { NextFunction, Request, RequestHandler, Response } from "express"
//wanago.io/2018/12/17/typescript-express-error-handling-validation/https:

//decorator for handle async db calls
//https://www.youtube.com/watch?v=5Hpv6fLf93Q
export const catchAsync = (handler: RequestHandler) => (
  ...args: [Request, Response, NextFunction]
) => handler(...args).catch(args[2])

//custom http error class
export class httpError extends Error {
  status: number
  code?: string
  detail?: string

  constructor(status: number, message: string, code?: string, detail?: string) {
    super(message)
    this.status = status
    this.code = code
    this.detail = detail
  }
}

config({ path: path.resolve(__dirname, "../.env") })

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

export const unknownEndpoint = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({ message: "Unable to locate the requested resource" })
}

export const serverError = (
  err: httpError, //need to make a custom error handling class
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //console.log(err)
  //handle custom errors
  if (err.status) {
    return res.status(err.status).json({ message: err.message })
  }
  //for postgres database specific error
  else if (err.code) {
    console.log(err)
    switch (err.code) {
      case "23505":
        return res.status(400).json({ message: "email already used" })
      //no schedule has been added to a programme yet
      case "22004":
        return res.status(404).json({ message: "no schedule found" })
      default:
        return res.status(400).json({ message: err.detail })
    }
  }
  //other errors
  else {
    res.status(500).json({ errorMessage: `Something wrong happen ${err}` })
  }
  return
}
