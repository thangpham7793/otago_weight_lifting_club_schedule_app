import { catchAsync, HttpError } from "./errorHandlers.ts";
import { NextFunction, Request, Response } from "../types.d.ts";
import { verifyToken } from "./index.ts";

export const isEmail = (email: string): boolean => {
  const pattern = /^([\w-]+|[\w-]+(.[\w-]+)+?)@([\w-]+|[\w-]+(.[\w-]+)+?)$/;
  return pattern.test(email);
};

export const checkEmail = (req: Request, res: Response, next: NextFunction) => {
  if (isEmail(req.body.email) === false) {
    return res.status(400).json({ message: "bad email format" });
  } else {
    next();
  }
};

const unsafeExtractHeaderAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(`Receiving Auth Header as ${req.header("authorization")}`);

  const bearerToken = req.header("authorization");

  if (bearerToken && bearerToken.toLowerCase().startsWith("bearer ")) {
    try {
      const token = await verifyToken(bearerToken.substring(7));

      console.log(`The decoded token is ${JSON.stringify(token)}`);
      req.body = { ...req.body, token };
      next();
    } catch (error) {
      console.error(error);
      throw new HttpError(500, `Error decoding verifying jwt token ${error}`);
    }
  } else {
    return res.status(401).json({ message: "Invalid or missing credentials!" });
  }
};

export const extractHeaderAuthToken = catchAsync(
  unsafeExtractHeaderAuthToken,
);
