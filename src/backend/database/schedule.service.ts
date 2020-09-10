import { Request, Response } from "express"
import { PoolClient } from "pg"
import pool from "./pool"
import { checkPassword } from "../utils/auth"

export class ScheduleService {
  async getAllProgrammes(req: Request, res: Response) {
    const { email, password } = req.body
    console.log(email, password)
    const params = [email]

    const statement = `
    SELECT email, hashed_password  
    FROM gym_user
    WHERE email = $1;`

    const client: PoolClient = await pool.connect()
    const result = await client.query(statement, params)
    //  console.log(result.rows)
    //TODO: check password here using jwt and bcrypt

    if (!result.rows) {
      // need to throw error here!
      throw new Error("unknown email")
    }

    const { hashed_password } = result.rows[0]

    if (checkPassword(password, hashed_password)) {
      const result2 = await client.query(
        `SELECT programme_name AS "programmeName", programme_id AS "programmeId" FROM programme;`
      )
      if (!result2) {
        res.status(404).json({ message: "no programme found" })
      } else {
        //return array of schedule object
        console.log(result2.rows)
        res.status(200).json(result2.rows)
      }
    } else {
      throw new Error("wrong password")
    }

    await client.release()
  }

  async getAllSchedules(req: Request, res: Response) {
    const client: PoolClient = await pool.connect()
    const params = [req.body.programmeId]
    const statement = `
    SELECT "scheduleId", "scheduleName", "weekCount" FROM schedule WHERE "scheduleId" = ANY(ARRAY(SELECT "scheduleIds" FROM programme WHERE "programmeId" = $1)); 
    `
    try {
      const { rows } = await client.query(statement, params)
      res.status(200).send(rows)
    } catch (err) {
      console.log(err)
      res.status(404).send({ error: "no available schedule" })
    } finally {
      client.release()
    }
  }

  async getWeeklySchedule(req: Request, res: Response) {
    const { scheduleId, week } = req.params
    //console.log(programmeId, scheduleId, week)
    const params = [scheduleId, week].map((ele) => parseInt(ele))
    const statement = `
    SELECT timetable[$2] as week_${week} FROM schedule WHERE "scheduleId" = $1;`

    let client: PoolClient

    try {
      client = await pool.connect()
      const result = await client.query(statement, params)

      if (!result.rows) {
        throw new Error("no availale weekly schedule found")
      }
      res.status(200).json(result.rows[0][`week_${week}`])
      //console.log(result.rows[0])
    } catch (err) {
      console.log(err)
      res.send("Error" + err)
    } finally {
      client.release()
    }
  }

  async endPool() {
    await pool.end()
  }
}
