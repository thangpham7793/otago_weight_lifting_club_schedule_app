import { Request, Response } from "express"
import { PoolClient } from "pg"
import pool from "./pool"

export class LearnerService {
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
