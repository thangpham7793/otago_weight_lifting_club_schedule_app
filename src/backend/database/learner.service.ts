import { compare } from "bcrypt"
import { httpError, makeToken } from "./../utils/register"
import { Request, Response, NextFunction } from "express"

//using connection pool to support concurrent connection (caching conns)
import { PoolClient } from "pg"
import { pool } from "./pool"

export class LearnerService {
  redirectToSignupPage(req: Request, res: Response) {
    res.redirect("../signup.html")
  }

  async getAllLearners(req: Request, res: Response, next: NextFunction) {
    const client: PoolClient = await pool.connect()
    const result = await client.query(
      `SELECT "learnerId", username, email, "firstName", "lastName", "snatch", clean, jerk, "cleanAndJerk", "backSquat", "frontSquat", "pushPress" FROM learner ORDER BY "firstName"`
    )

    res.status(200).json(result.rows)
    return client.release()
  }

  async createLearner(req: Request, res: Response, next: NextFunction) {
    const newLearnerInfo = req.body
    console.log(req.body)

    //added username based on lastName + 1st letter of firstName
    const partialUsername = `${
      newLearnerInfo.lastName
    }${newLearnerInfo.firstName.substring(0, 1)}`

    //use select currval since nextval is called on insert and before the concat takes place so currval would get the id of the new learner
    const statement = `
    INSERT INTO learner ("firstName", "lastName", "email", "programmeId", "username")
    VALUES ($1, $2, $3, $4, concat('${partialUsername}', (select currval('"learner_learnerId_seq"')))) RETURNING username, "learnerId";`

    //make sure only lowercase is inserted as well
    const params = Object.values(newLearnerInfo).map((val) =>
      typeof val === "string" ? val.toLowerCase() : val
    )

    console.log(params)
    const client: PoolClient = await pool.connect()
    const result = await client.query(statement, params)

    console.log(result.rows[0])

    res.status(201).send(result.rows[0])
    return client.release()
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

    const client: PoolClient = await pool.connect()
    const { rows } = await client.query(statement, params)

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
    return client.release()
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
    const client: PoolClient = await pool.connect()
    const { rows } = await client.query(statement, params)
    const pbs = { ...rows[0] }
    Object.keys(rows[0]).forEach((k) => {
      pbs[k] = parseFloat(rows[0][k])
    })
    res.status(200).json(pbs)
    return client.release()
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
    const client: PoolClient = await pool.connect()
    await client.query(statement, params)
    res.status(204).send()
    return client.release()
  }

  async updateLearnerDetail(req: Request, res: Response, next: NextFunction) {
    const { token, learner } = req.body

    console.log("Received", token, learner)

    if (!learner) {
      throw new httpError(400, "Missing Learner Detail!")
    }

    const params = [...Object.keys(learner)].map((k: string) => {
      if (!["firstName", "lastName", "email"].includes(k)) {
        return parseFloat(learner[k])
      } else {
        return learner[k]
      }
    })

    console.log(params)

    const statement = `
    UPDATE learner SET
    email = $2,
    "firstName" = $3,
    "lastName" = $4,
    snatch = $5,
    clean = $6,
    jerk = $7,
    "cleanAndJerk" = $8,
    "backSquat" = $9,
    "frontSquat" = $10,
    "pushPress" = $11
    WHERE "learnerId" = $1;
    `
    const client: PoolClient = await pool.connect()
    await client.query(statement, params)
    res.status(204).send()
    return client.release()
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
    const client: PoolClient = await pool.connect()
    await client.query(statement, params)
    res.status(204).send()
    return client.release()
  }
}
