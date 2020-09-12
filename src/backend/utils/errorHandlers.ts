import { NextFunction, Request, Response } from "express"
//wanago.io/2018/12/17/typescript-express-error-handling-validation/https:

const httpErrorHandlers = (
  err: Error, //need to make a custom error handling class
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).send({ errorMessage: `Something wrong happen ${err}` })
}

export default { httpErrorHandlers }
