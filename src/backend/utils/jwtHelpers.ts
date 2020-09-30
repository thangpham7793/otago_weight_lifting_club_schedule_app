import { httpError } from "./register"
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import path from "path"
import { config } from "dotenv"

const NOW = Math.floor(Date.now() / 1000)
const DAYS_IN_SECONDS = 86400

config({ path: path.resolve(__dirname, "../.env") })

export const makeToken = async (userId: {}) => {
  const signOptions = {
    exp: NOW + 28 * DAYS_IN_SECONDS,
    data: userId,
  }

  try {
    const token = await jwt.sign(signOptions, process.env.SECRET)
    return token
  } catch (error) {
    throw new httpError(500, `Error signing token ${error}`)
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //disable cookie check for now (problem on mobile)
  console.log("Verifying JWT")
  const token = req.cookies["jwt"]
  try {
    const decoded = await jwt.verify(token, process.env.SECRET)
    console.log(decoded)
    req.body = { ...req.body }
    next()
  } catch (error) {
    console.log(`No valid JWT found: ${error}`)
    res.redirect(301, "/")
  }
}
