import { NextFunction, Request, RequestHandler, Response } from "express"

export const catchAsync =
  (handler: RequestHandler) =>
  (...args: [Request, Response, NextFunction]) =>
    (handler(...args) as any).catch(args[2])

export class HttpError extends Error {
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

export const serverError = (
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err)
  switch (true) {
    case Boolean(err.status):
      return res.status(err.status).json({ message: err.message })
    case Boolean(err.code):
      return res.status(400).json({ message: transformPgError(err) })
    default:
      return res.status(500).json({ message: `Something wrong happen ${err}` })
  }
}

function transformPgError(err: HttpError) {
  switch (err.code) {
    case "23505":
      if (
        err.detail.includes("Key (email)") &&
        err.detail.includes("already exists")
      ) {
        return `Email Already Used!`
      }
      return err.detail
    //no schedule has been added to a programme yet
    case "22004":
      return "no schedule found"
    default:
      return err.detail
  }
}

export const unknownEndpoint = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.redirect(301, "/")
}
