import { compare } from "bcrypt"
import { httpError } from "./../utils/errorHandlers"
import { makeToken } from "./../utils/jwtHelpers"
import { Request, Response, NextFunction } from "express"
import { PoolClient } from "pg"
import pool from "./pool"

export class LearnerService {
  async createLearner(req: Request, res: Response, next: NextFunction) {
    const newLearnerInfo = req.body
    const statement = `
    INSERT INTO learner ("firstName", "lastName", "email", "programmeId")
    VALUES ($1, $2, $3, $4) RETURNING "firstName", "lastName", "email", "programmeId"`

    const params = Object.values(newLearnerInfo)
    console.log(params)
    const client: PoolClient = await pool.connect()
    const result = await client.query(statement, params)
    res.status(201).send(result.rows[0])
    return client.release()
  }

  async checkCredentials(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body
    console.log(email, password)

    const params = [email]
    const statement = `    
      SELECT 
      p."hashedPassword", p."programmeId", p."programmeName", 
      l."learnerId", l.snatch, l.clean, l.jerk, 
      l."cleanAndJerk", l."backSquat", l."frontSquat", l."pushPress"
      FROM learner l
      JOIN programme p 
      USING ("programmeId")
      WHERE email = $1;`

    const client: PoolClient = await pool.connect()
    const { rows } = await client.query(statement, params)

    //console.log(result.rows)
    if (rows.length === 0) {
      throw new httpError(401, "unknown email")
    }

    const { hashedPassword, learnerId } = rows[0]
    //TODO: check password here using jwt and bcrypt
    const isValidPassword = await compare(password, hashedPassword)
    if (isValidPassword) {
      //send programmeId to scheduleService.getAllProgrammes
      const token = await makeToken({ learnerId })
      req.body = { ...req.body, ...rows[0], token }
      next()
    } else {
      throw new httpError(401, "wrong password")
    }
    return client.release()
  }

  async getPbs(req: Request, res: Response, next: NextFunction) {
    const { learnerId } = req.body.token
    console.log(`Receiving credentials from Auth Header as ${learnerId}`)
    const params = [learnerId]
    const statement = `
    SELECT
    snatch,
    clean,
    jerk,
    "cleanAndJerk",
    "backSquat",
    "frontSquat",
    "pushPress" 
    FROM learner
    WHERE "learnerId" = $1;
    `
    const client: PoolClient = await pool.connect()
    const { rows } = await client.query(statement, params)
    const pbs = { ...rows[0] }
    Object.keys(rows[0]).forEach((k) => {
      pbs[k] = parseFloat(rows[0][k])
    })
    res.status(200).json(pbs)
    return client.release()
  }

  async updatePbs(req: Request, res: Response, next: NextFunction) {
    console.log("Received", req.body)
    const { token, newPbs } = req.body
    if (!newPbs) {
      throw new httpError(400, "Missing new personal bests to update!")
    }
    const params = [
      ...Object.values(newPbs),
      token.data.learnerId,
    ].map((ele: string) => parseFloat(ele))
    const statement = `
    UPDATE learner SET
    snatch = $1,
    clean = $2,
    jerk = $3,
    "cleanAndJerk" = $4,
    "backSquat" = $5,
    "frontSquat" = $6,
    "pushPress" = $7
    WHERE "learnerId" = $8;
    `
    console.log(params)
    const client: PoolClient = await pool.connect()
    await client.query(statement, params)
    res.status(204).send()
    return client.release()
  }
}
