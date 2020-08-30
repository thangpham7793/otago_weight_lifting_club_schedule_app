import { Request, Response } from "express"
import { PoolClient } from "pg"
import pool from "./pool"

export class ScheduleService {
  async getWeeklySchedule(req: Request, res: Response) {
    const { programmeId, scheduleId, week } = req.params
    console.log(programmeId, scheduleId, week)
    const params = [programmeId, scheduleId, week].map((ele) => parseInt(ele))
    let statement = `
    SELECT 
      p.programme_name as programme,
      s.schedule_name as schedule,
      w.timetable as week_${week}
    FROM
      weekly_timetable w
      INNER JOIN schedule s ON w.schedule_id = s.schedule_id
      INNER JOIN programme p ON w.programme_id = p.programme_id
    WHERE
      w.programme_id = $1 AND w.schedule_id = $2 AND w.week = $3;`

    let client: PoolClient

    try {
      client = await pool.connect()
      const result = await client.query(statement, params)
      res.status(200).json(result.rows[0])
      console.log(result.rows[0])
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
