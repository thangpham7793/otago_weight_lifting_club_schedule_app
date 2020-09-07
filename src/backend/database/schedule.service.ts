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

  async checkCredentialsAndGetSchedules(req: Request, res: Response) {
    const { email, password } = req.body
    console.log(email, password)
    const params = [email]

    const statement = `
    SELECT email, hashed_password, schedule_name, week_count, schedule_id, programme_name   
    FROM gym_user st
    JOIN schedule sc
    ON (st.programme_id = sc.programme_id)
    JOIN programme p
    ON (st.programme_id = p.programme_id)
    WHERE email = $1;`

    let client: PoolClient

    try {
      client = await pool.connect()
      const result = await client.query(statement, params)
      //  console.log(result.rows)
      //TODO: check password here using jwt and bcrypt

      if (!result.rows) {
        // need to throw error here!
        throw new Error("unknown email")
      }

      const { hashed_password } = result.rows[0]

      if (checkPassword(password, hashed_password)) {
        //remove email and password from result
        result.rows.forEach((row) => {
          delete row.email
          delete row.hashed_password
        })
        //return array of schedule object
        console.log(result.rows)
        res.status(200).json(result.rows)
      } else {
        throw new Error("wrong password")
      }

      //console.log(result.rows[0])
    } catch (err) {
      console.log(err)
      res.send("Error" + err)
    } finally {
      client.release()
    }
  }

  async getAllSchedules(req: Request, res: Response) {
    const { programmeId } = req.params
    console.log(programmeId)
    const params = [parseInt(programmeId)]
    const statement = `
    SELECT 
      schedule_id AS "scheduleId", 
      schedule_name AS "scheduleName", 
      week_count AS "weekCount" 
    FROM schedule s
    JOIN programme p
    ON (s.programme_id = p.programme_id)
    WHERE p.programme_id = $1;`

    const client: PoolClient = await pool.connect()
    const result = await client.query(statement, params)
    console.log(result.rows)
    res.status(200).json(result.rows)

    await client.release()
  }

  async getWeeklySchedule(req: Request, res: Response) {
    const { scheduleId, week } = req.params
    //console.log(programmeId, scheduleId, week)
    const params = [scheduleId, week].map((ele) => parseInt(ele))
    const statement = `
    SELECT timetable as week_${week}
    FROM weekly_timetable w 
    JOIN schedule s
    ON (w.schedule_id = s.schedule_id)
    WHERE s.schedule_id = $1 AND week = $2;`

    let client: PoolClient

    try {
      client = await pool.connect()
      const result = await client.query(statement, params)

      if (!result.rows) {
        throw new Error("no availale weekly schedule found")
      }

      res.status(200).json(result.rows[0])
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
