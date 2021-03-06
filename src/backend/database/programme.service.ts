import { hash } from "bcrypt"
import { Request, Response } from "express"
import { PoolClient } from "pg"
import { pool } from "./pool"
import { TimeTable } from "../types"
import { scheduleInfoJsonFormatter } from "../utils/programmeServiceHelpers"
import { execute } from "./register"
import { delay } from "../utils/register"

export class ProgrammeService {
  async getAllProgrammes(req: Request, res: Response) {
    const statement = `SELECT "programmeName", "programmeId" FROM programme;`
    const { rows } = await execute(statement)

    if (rows.length === 0) {
      res.status(404).json({ message: "no programme found" })
    } else {
      res.status(200).json({ programmes: rows, token: req.body.token })
    }
  }

  async getAllSchedules(req: Request, res: Response) {
    const {
      programmeId,
      programmeName,
      learnerName,
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

    const { rows } = await execute(statement, params)

    const schedules = rows.map((schedule) => {
      return { ...schedule, programmeName }
    })

    //send back pbs, token and programmeInfo
    res.status(200).send({ pbs, schedules, learnerName, token })
  }

  async getWeeklySchedule(req: Request, res: Response) {
    const { scheduleId, week } = req.params

    console.log(scheduleId, week)

    const params = [scheduleId, week].map((ele) => parseInt(ele))
    const statement = `
    SELECT timetable[$2] as week_${week} FROM schedule WHERE "scheduleId" = $1;`

    const { rows } = await execute(statement, params)

    if (!rows) {
      res.status(404).json({ message: "no weekly schedule found" })
    }

    res.status(200).json(rows[0][`week_${week}`])
  }

  async deleteSchedule(req: Request, res: Response) {
    const { scheduleId } = req.params
    console.log(`Received schedule Id ${scheduleId}`)

    const params = [parseInt(scheduleId)]
    const statement = `DELETE FROM schedule WHERE "scheduleId" = $1;`

    await execute(statement, params)
    res.status(204).send()
  }

  async getAvailableProgrammesToPublish(req: Request, res: Response) {
    const { scheduleId } = req.params

    //2 steps: find ids of all programmes a schedule belongs to, then only get the ids and names of those that are not in the prev result
    const statement = `
    SELECT p."programmeId", p."programmeName" 
    FROM programme p 
    WHERE p."programmeId" NOT IN (
      SELECT ps."programmeId" 
      FROM programme_schedule ps 
      WHERE ps."scheduleId" = $1
    );
    `

    const params = [parseInt(scheduleId)]

    const { rows } = await execute(statement, params)

    if (!rows) {
      res.status(404).json({ message: "no schedule found" })
    }

    res.status(200).json(rows)
  }

  async getAllSchedulesInfo(req: Request, res: Response) {
    const statement = `
    SELECT 
    s."scheduleId", s."scheduleName", s."weekCount",
    p."programmeId", p."programmeName"
    FROM schedule s
    LEFT JOIN programme_schedule ps
    ON s."scheduleId" = ps."scheduleId"
    LEFT JOIN programme p
    ON ps."programmeId" = p."programmeId";`

    const { rows } = await execute(statement)

    if (!rows) {
      res.status(404).json({ message: "no schedule found" })
    }

    res.status(200).json(scheduleInfoJsonFormatter(rows))
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

    await execute(statement, params)

    res.status(204).send()
  }

  //TODO: need unit testing for this
  static makeWeeklySchedulesString(weeklySchedules: TimeTable) {
    return Object.values(weeklySchedules).reduce(
      (acc: string, week, index: number) => {
        if (index === 0) {
          return `'${JSON.stringify(week)}'`
        } else {
          return `${acc}, '${JSON.stringify(week)}'`
        }
      },
      ""
    )
  }

  async createWeeklySchedules(req: Request, res: Response) {
    const { timetable, scheduleName, weekCount, programmeIds } = req.body

    const weeklySchedules = ProgrammeService.makeWeeklySchedulesString(
      timetable
    )

    console.log({ scheduleName, weekCount, programmeIds })

    let params = [scheduleName, weekCount]
    let statement = `
    INSERT INTO schedule ("scheduleName", "weekCount", timetable)
    VALUES ($1, $2, ARRAY[${weeklySchedules}]) 
    RETURNING "scheduleId", "scheduleName", "weekCount"
    `
    //don't use execute here to maintain connection
    const client: PoolClient = await pool.connect()
    const { rows } = await client.query(statement, params)

    const newScheduleId = rows[0].scheduleId

    if (programmeIds.length > 0) {
      const tasks = programmeIds.map(async (programmeId: number) => {
        params = [newScheduleId, programmeId]
        statement = `
        INSERT INTO programme_schedule ("scheduleId", "programmeId")
        VALUES ($1, $2);
        `
        return await client.query(statement, params)
      })
      await Promise.all(tasks)
      res.status(200).json(rows[0])
    }

    res.status(200).json(rows[0])
    return client.release()
  }

  async updateWeeklySchedules(req: Request, res: Response) {
    const { scheduleName, timetable, scheduleId, weekCount } = req.body

    let statement, params

    if (timetable) {
      const weeklySchedules = ProgrammeService.makeWeeklySchedulesString(
        timetable
      )
      params = [scheduleId, scheduleName, weekCount]
      statement = `
      UPDATE schedule
      SET timetable = ARRAY[${weeklySchedules}], 
      "scheduleName" = $2, 
      "weekCount" = $3
      WHERE "scheduleId" = $1;
      `
    } else {
      params = [scheduleId, scheduleName]
      statement = `
      UPDATE schedule
      SET "scheduleName" = $2
      WHERE "scheduleId" = $1;
      `
    }

    //TODO: can abstract this into a class (function)

    await execute(statement, params)
    res.status(204).send()
  }

  async unpublishSchedule(req: Request, res: Response) {
    //remove one schedule from one programme

    const { scheduleId, programmeId } = req.params
    console.log(scheduleId, programmeId)

    const params = [parseInt(scheduleId), parseInt(programmeId)]
    const statement = `
      DELETE FROM programme_schedule
      WHERE "scheduleId" = $1
      AND "programmeId" = $2
      `

    await execute(statement, params)
    res.status(204).send()
  }

  async publishSchedule(req: Request, res: Response) {
    //can be multiple programmes
    const { programmeIds } = req.body
    const { scheduleId } = req.params

    console.log(
      `Publish schedule ${scheduleId} to programmes ${JSON.stringify(
        programmeIds
      )}`
    )

    const client: PoolClient = await pool.connect()
    let params, statement

    const tasks = programmeIds.map(async (programmeId: number) => {
      params = [scheduleId, programmeId]
      statement = `
      INSERT INTO programme_schedule ("scheduleId", "programmeId")
      VALUES ($1, $2);
      `
      return await client.query(statement, params)
    })

    await Promise.all(tasks)
    res.status(204).send()
    client.release()
  }

  async getAllExercises(req: Request, res: Response) {
    const statement = `SELECT * FROM exercise`
    const { rows } = await execute(statement)
    const exerciseNames = rows.reduce((acc, exercise) => {
      return [...acc, exercise.exerciseName]
    }, [])
    res.status(200).json({ exerciseNames })
  }

  async endPool() {
    await pool.end()
  }
}
