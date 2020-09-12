import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import path from "path"
import { config } from "dotenv"

config({ path: path.resolve(__dirname, "../.env") })

export const makeToken = async (userId: {}) => {
  try {
    const token = await jwt.sign(userId, process.env.SECRET)
    return token
  } catch (error) {
    throw new Error(`Error signing token ${error}`)
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Verifying JWT")
  const token = req.cookies["jwt"]
  try {
    const decoded = await jwt.verify(token, process.env.SECRET)
    console.log(decoded)
    req.body = { ...req.body }
    next()
  } catch (error) {
    console.log(`No valid JWT found: ${error}`)
    res.redirect("/", 301)
  }
}
