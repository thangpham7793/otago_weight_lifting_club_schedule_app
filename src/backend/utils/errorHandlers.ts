import path from "path"
import { config } from "dotenv"
import { NextFunction, Request, RequestHandler, Response } from "express"
//wanago.io/2018/12/17/typescript-express-error-handling-validation/https:

//decorator for handle async db calls
//https://www.youtube.com/watch?v=5Hpv6fLf93Q
export const catchAsync = (handler: RequestHandler) => (
  ...args: [Request, Response, NextFunction]
) => (handler(...args) as any).catch(args[2])

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

export const serverError = (
  err: httpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //handle custom errors
  if (err.status) {
    return res.status(err.status).json({ message: err.message })
  }
  //for postgres database specific error
  else if (err.code) {
    console.log(err)
    switch (err.code) {
      case "23505":
        if (
          err.detail.includes("Key (email)") &&
          err.detail.includes("already exists")
        ) {
          return res.status(400).json({ message: `Email Already Used!` })
        }
        return res.status(400).json({ message: `${err.detail}` })
      //no schedule has been added to a programme yet
      case "22004":
        return res.status(404).json({ message: "no schedule found" })
      default:
        return res.status(400).json({ message: err.detail })
    }
  }
  //other errors
  else {
    res.status(500).json({ message: `Something wrong happen ${err}` })
  }
  return
}

export const unknownEndpoint = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //res.status(404).json({ message: "Unable to locate the requested resource" })
  res.redirect(301, "/")
}
