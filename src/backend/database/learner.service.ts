import { compare } from "bcrypt"
import { httpError, makeToken } from "./../utils/register"
import { Request, Response, NextFunction } from "express"
import { execute } from "./register"

export class LearnerService {
  redirectToSignupPage(req: Request, res: Response) {
    res.redirect("../signup.html")
  }

  async getAllLearners(req: Request, res: Response, next: NextFunction) {
    const result = await execute(
      `SELECT "learnerId", username, email, "firstName", "lastName", "snatch", clean, jerk, "cleanAndJerk", "backSquat", "frontSquat", "pushPress" FROM learner ORDER BY "firstName"`
    )

    res.status(200).json(result.rows)
  }

  async createLearner(req: Request, res: Response, next: NextFunction) {
    const newLearnerInfo = req.body
    console.log(req.body)

    //added username based on lastName + 1st letter of firstName
    newLearnerInfo.username = `${
      newLearnerInfo.lastName
    }${newLearnerInfo.firstName.substring(0, 1)}`

    //use select currval since nextval is called on insert and before the concat takes place so currval would get the id of the new learner
    const statement = `
    INSERT INTO learner ("firstName", "lastName", "email", "programmeId", "username")
    VALUES ($1, $2, $3, $4, $5) RETURNING username, "learnerId";`

    //make sure only lowercase is inserted as well
    const params = Object.values(newLearnerInfo).map((val) =>
      typeof val === "string" ? val.toLowerCase() : val
    )

    const result = await execute(statement, params)
    res.status(201).send(result.rows[0])
  }

  async checkCredentials(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body
    console.log(username, password)

    const params = [username.toLowerCase()]
    const statement = `    
      SELECT 
      p."hashedPassword", p."programmeId", p."programmeName", 
      l."learnerId", l.snatch, l.clean, l.jerk, 
      l."cleanAndJerk", l."backSquat", l."frontSquat", l."pushPress"
      FROM learner l
      JOIN programme p 
      USING ("programmeId")
      WHERE username = $1;`

    const { rows } = await execute(statement, params)

    //console.log(result.rows)
    if (rows.length === 0) {
      throw new httpError(401, "unknown username")
    }

    const { hashedPassword, learnerId } = rows[0]
    //TODO: check password here using jwt and bcrypt
    const isValidPassword = await compare(
      password.toLowerCase(),
      hashedPassword
    )
    if (isValidPassword) {
      //send programmeId to scheduleService.getAllProgrammes
      const token = await makeToken({ learnerId })
      req.body = { ...req.body, ...rows[0], token }
      next()
    } else {
      throw new httpError(401, "wrong password")
    }
  }

  async getPbs(req: Request, res: Response, next: NextFunction) {
    const { learnerId } = req.body.token.data
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
    const { rows } = await execute(statement, params)
    const pbs = { ...rows[0] }
    Object.keys(rows[0]).forEach((k) => {
      pbs[k] = parseFloat(rows[0][k])
    })
    res.status(200).json(pbs)
  }

  //FIXME: this will need to reflect update on other fields as well. May need a diff function to only update selected field
  async updatePbs(req: Request, res: Response, next: NextFunction) {
    const { token, newPbs } = req.body

    console.log("Received", token, newPbs)

    if (!newPbs) {
      throw new httpError(400, "Missing new personal bests to update!")
    }

    const params = [
      ...Object.values(newPbs),
      token.data.learnerId,
    ].map((ele: string) => parseFloat(ele))

    console.log(params)

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

    await execute(statement, params)
    res.status(204).send()
  }

  async updateLearnerDetail(req: Request, res: Response, next: NextFunction) {
    const { token, learner } = req.body

    console.log("Received", token, learner)

    if (!learner) {
      throw new httpError(400, "Missing Learner Detail!")
    }

    const params = [...Object.keys(learner)].map((k: string) => {
      if (!["firstName", "lastName", "email", "username"].includes(k)) {
        return parseFloat(learner[k])
      } else {
        return learner[k]
      }
    })

    console.log(params)

    const statement = `
    UPDATE learner SET
    username = $2,
    email = $3,
    "firstName" = $4,
    "lastName" = $5,
    snatch = $6,
    clean = $7,
    jerk = $8,
    "cleanAndJerk" = $9,
    "backSquat" = $10,
    "frontSquat" = $11,
    "pushPress" = $12
    WHERE "learnerId" = $1;
    `

    await execute(statement, params)
    res.status(204).send()
  }

  async deleteLearner(req: Request, res: Response, next: NextFunction) {
    const { learnerId } = req.params

    if (!learnerId) {
      throw new httpError(400, "Missing LearnerId!")
    }

    const params = [parseInt(learnerId)]

    const statement = `
    DELETE FROM learner
    WHERE "learnerId" = $1;
    `
    await execute(statement, params)
    res.status(204).send()
  }

  async updatePracticeBest(req: Request, res: Response) {
    const { pbId, weight, repMax } = req.body
    console.log("received", pbId, weight, repMax)
    const statement = `
      UPDATE practice_bests 
      SET weight = $2, 
      "repMax" = $3,
      "lastEdited" = CURRENT_DATE 
      WHERE "pbId" = $1;`

    const params = [pbId, weight, repMax]
    await execute(statement, params)
    res.status(204).send()
  }

  async getPracticeBestsByExerciseName(req: Request, res: Response) {
    const { exerciseName } = req.params
    const { learnerId } = req.body.token.data
    console.log("Received", learnerId, exerciseName)
    const statement = `
      SELECT "pbId", "learnerId", "exerciseName", 
      "repMax", "weight", "lastEdited"::TEXT 
      FROM practice_bests 
      WHERE "learnerId" = $1 
      AND "exerciseName" = $2 
      ORDER BY "repMax";`
    const params = [parseInt(learnerId), exerciseName]
    const { rows } = await execute(statement, params)
    res.status(200).json(rows)
  }

  async postNewPracticeBest(req: Request, res: Response) {
    const { exerciseName, repMax, weight } = req.body
    const { learnerId } = req.body.token.data
    console.log("Received", learnerId, exerciseName, repMax, parseFloat(weight))
    const statement = `
    INSERT INTO practice_bests ("learnerId", "exerciseName", "repMax", "weight", "lastEdited") VALUES ($1, $2, $3, $4, $5) RETURNING "pbId", "exerciseName", "repMax", "weight", "lastEdited"::TEXT;
    `
    const params = [
      learnerId,
      exerciseName,
      repMax,
      weight,
      new Date().toISOString().substring(0, 10),
    ]
    const { rows } = await execute(statement, params)
    res.status(201).json(rows[0])
  }
}
