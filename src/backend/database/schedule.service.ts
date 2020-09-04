import { Request, Response } from "express"
import { PoolClient } from "pg"
import pool from "./pool"
import { checkPassword } from "../utils/auth"

export class ScheduleService {
  async checkCredentialsAndGetSchedules(req: Request, res: Response) {
    const { username, password } = req.body

    const params = [username]

    const statement = `
    SELECT username, hashed_password, schedule_name, week_count, schedule_id, programme_name   
    FROM student st
    JOIN schedule sc
    ON (st.programme_id = sc.programme_id)
    JOIN programme p
    ON (st.programme_id = p.programme_id)
    WHERE username = $1;`

    let client: PoolClient

    try {
      client = await pool.connect()
      const result = await client.query(statement, params)
      //  console.log(result.rows)
      //TODO: check password here using jwt and bcrypt

      if (!result.rows) {
        // need to throw error here!
        throw new Error("unknown username")
      }

      const { hashed_password } = result.rows[0]

      if (checkPassword(password, hashed_password)) {
        //remove username and password from result
        result.rows.forEach((row) => {
          delete row.username
          delete row.hashed_password
        })
        //return array of schedule object
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

    const params = [parseInt(programmeId)]

    const statement = `
    SELECT 
      schedule_name, 
      week_count, 
      schedule_id 
    FROM programme p 
    INNER JOIN schedule s 
    ON (schedule_id = schedule_id)
    WHERE schedule_id = ?;`

    let client: PoolClient

    try {
      client = await pool.connect()
      const result = await client.query(statement, params)
      res.status(200).json(result.rows)
      //console.log(result.rows[0])
    } catch (err) {
      console.log(err)
      res.send("Error" + err)
    } finally {
      client.release()
    }
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
