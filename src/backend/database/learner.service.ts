import { Request, Response } from "express"
import { PoolClient } from "pg"
import pool from "./pool"

export class LearnerService {
  async createLearner(req: Request, res: Response) {
    const newLearnerInfo = req.body
    const statement = `
    INSERT INTO learner ("firstName", "lastName", "email", "programmeId")
    VALUES ($1, $2, $3, $4) RETURNING "firstName", "lastName", "email", "programmeId"`

    const params = Object.values(newLearnerInfo)
    const client: PoolClient = await pool.connect()
    const result = await client.query(statement, params)
    //TODO: check password here using jwt and bcrypt

    res.status(201).send(result.rows[0])
    await client.release()
  }

  async updatePbs(req: Request, res: Response) {
    const { learnerId } = req.params
    const pbs = req.body

    const statement = `
    SELECT email, hashed_password  
    FROM gym_user
    WHERE email = $1;`

    console.log(learnerId, pbs)
    const params = [parseInt(learnerId)]
    const client: PoolClient = await pool.connect()
    const result = await client.query(statement, params)
    console.log(result.rows)
    //TODO: check password here using jwt and bcrypt

    res.status(204).send()
    await client.release()
  }
}
