import { Request, Response } from "express"
import { PoolClient } from "pg"
import pool from "./pool"

export class ScheduleService {
  async getAllProgrammes(req: Request, res: Response) {
    const statement = `SELECT "programmeName", "programmeId" FROM programme;`
    const client: PoolClient = await pool.connect()
    const { rows } = await client.query(statement)

    if (rows.length === 0) {
      res.status(404).json({ message: "no programme found" })
    } else {
      //return array of object with programmeName and Id
      res.status(200).json(rows)
    }
    return client.release()
  }

  async getAllSchedules(req: Request, res: Response) {
    const client: PoolClient = await pool.connect()
    const {
      learnerId,
      programmeId,
      programmeName,
      token,
      snatch,
      clean,
      jerk,
      cleanAndJerk,
      backSquat,
      frontSquat,
      pushPress,
    } = req.body

    const pbs = {
      snatch,
      clean,
      jerk,
      cleanAndJerk,
      backSquat,
      frontSquat,
      pushPress,
    }

    pbs.snatch = parseFloat(pbs.snatch)
    pbs.clean = parseFloat(pbs.clean)
    pbs.jerk = parseFloat(pbs.jerk)
    pbs.cleanAndJerk = parseFloat(pbs.cleanAndJerk)
    pbs.backSquat = parseFloat(pbs.backSquat)
    pbs.frontSquat = parseFloat(pbs.frontSquat)
    pbs.pushPress = parseFloat(pbs.pushPress)

    const params = [programmeId]
    const statement = `
    SELECT 
    "scheduleId", "scheduleName", "weekCount" 
    FROM schedule 
    WHERE "scheduleId" = ANY(ARRAY(SELECT "scheduleIds" FROM programme WHERE "programmeId" = $1)); 
    `

    const { rows } = await client.query(statement, params)

    if (rows.length === 0) {
      res.status(404).json({ message: "no available schedule" })
    } else {
      const schedules = rows.map((schedule) => {
        return { ...schedule, programmeName }
      })

      //add token to cookie
      res.cookie("jwt", token, {
        expires: new Date(Number(new Date()) + 315360000000),
        httpOnly: true,
      })

      console.log(`Sending ${token} to client!`)
      //send back pbs and programmeInfo
      res.status(200).send({ pbs, schedules, learnerId })
    }

    return client.release()
  }

  async getWeeklySchedule(req: Request, res: Response) {
    const { scheduleId, week } = req.params
    //console.log(programmeId, scheduleId, week)
    const params = [scheduleId, week].map((ele) => parseInt(ele))
    const statement = `
    SELECT timetable[$2] as week_${week} FROM schedule WHERE "scheduleId" = $1;`

    const client: PoolClient = await pool.connect()
    const result = await client.query(statement, params)

    if (!result.rows) {
      res.status(404).json({ message: "no weekly schedule found" })
    }

    res.status(200).json(result.rows[0][`week_${week}`])

    return client.release()
  }

  async endPool() {
    await pool.end()
  }
}
