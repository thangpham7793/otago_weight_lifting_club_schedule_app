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
