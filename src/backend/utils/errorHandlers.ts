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

  constructor(status: number, message: string) {
    super(message)
    this.status = status
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
  //handle custom errors
  if (err.status) {
    res.status(err.status).json({ message: err.message })
  }
  //other errors
  else {
    res.status(500).send({ errorMessage: `Something wrong happen ${err}` })
  }
}
