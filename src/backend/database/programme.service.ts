import { schedules } from "../data/octoberSchedule"
import { hash } from "bcrypt"
import { Request, Response } from "express"
import { PoolClient } from "pg"
import { pool } from "./pool"
import util from "util"
import { TimeTable } from "../types"

export class ProgrammeService {
  async getAllProgrammes(req: Request, res: Response) {
    const statement = `SELECT "programmeName", "programmeId", "scheduleIds" FROM programme;`
    const client: PoolClient = await pool.connect()
    const { rows } = await client.query(statement)

    if (rows.length === 0) {
      res.status(404).json({ message: "no programme found" })
    } else {
      //return array of object with programmeName and Id
      res.status(200).json({ programmes: rows, token: req.body.token })
    }
    return client.release()
  }

  async getAllSchedules(req: Request, res: Response) {
    const client: PoolClient = await pool.connect()
    const {
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
    s."scheduleId", s."scheduleName", s."weekCount" 
    FROM programme p
    JOIN programme_schedule ps
    ON ps."programmeId" = p."programmeId"
    JOIN schedule s
    ON ps."scheduleId" = s."scheduleId"
    WHERE p."programmeId" = $1 
    ORDER BY s."scheduleId" DESC;
    `

    const { rows } = await client.query(statement, params)

    const schedules = rows.map((schedule) => {
      return { ...schedule, programmeName }
    })

    //send back pbs, token and programmeInfo
    res.status(200).send({ pbs, schedules, token })
    return client.release()
  }

  async getWeeklySchedule(req: Request, res: Response) {
    const { scheduleId, week } = req.params

    console.log(scheduleId, week)

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

  async changeProgrammePassword(req: Request, res: Response) {
    const { newPassword } = req.body
    const { programmeId } = req.params
    const hashedPassword = await hash(newPassword, 10)

    const params = [hashedPassword, programmeId]
    const statement = `
      UPDATE programme 
      SET "hashedPassword" = $1 
      WHERE "programmeId" = $2`

    const client: PoolClient = await pool.connect()
    await client.query(statement, params)

    return res.status(204)
  }

  //TODO: need unit testing for this
  static makeWeeklySchedulesString(weeklySchedules: TimeTable) {
    return Object.values(weeklySchedules).reduce((acc, week, index: number) => {
      if (index === 0) {
        return `'${JSON.stringify(week)}'`
      } else {
        return `${acc}, '${JSON.stringify(week)}'`
      }
    }, "")
  }

  async createWeeklySchedules(req: Request, res: Response) {
    const { timetable, scheduleName, weekCount } = req.body

    const weeklySchedules = ProgrammeService.makeWeeklySchedulesString(
      timetable
    )

    // const params = [scheduleName, 2]
    // const statement = `
    // INSERT INTO schedule ("scheduleName", "weekCount", timetable)
    // VALUES ($1, $2, ARRAY[${weeklySchedules}])
    // `
    // const client: PoolClient = await pool.connect()
    // await client.query(statement, params)

    console.log(
      util.inspect(weeklySchedules, { showHidden: false, depth: null })
    )

    return res.status(204).send()
  }

  async updateWeeklySchedules(req: Request, res: Response) {
    const { timetable, scheduleId } = req.body

    const weeklySchedules = ProgrammeService.makeWeeklySchedulesString(
      timetable
    )

    const params = [scheduleId]
    const statement = `
    
    UPDATE schedule
    SET timetable = ARRAY[${weeklySchedules}]
    WHERE "scheduleId" = $1;
    `
    //TODO: can abstract this into a class (function)
    const client: PoolClient = await pool.connect()
    await client.query(statement, params)

    return res.status(204).json()
  }

  async endPool() {
    await pool.end()
  }
}
