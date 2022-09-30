import { pool } from "../database/register"
import { api, LEARNER_TEST_TOKEN } from "./testHelper"

jest.setTimeout(30000)

describe("API Integration Tests - Learner Service", () => {
  describe("POST /learners/signup", () => {
    it("should create a new user in the database and initialise their personal bests", async () => {
      const newLearnerInfo = {
        firstName: "john",
        lastName: "doe",
        email: "test@domain.com",
        programmeId: 1,
      }

      const result = await api.post("/learners/signup").send(newLearnerInfo)

      expect(result.status).toEqual(201)
      expect(result.body).toHaveProperty("username")
      expect(result.body.username).toEqual(`doej`)
    })
  })

  afterAll(async () => {
    try {
      await pool.query(`DELETE FROM learner WHERE email = $1`, [
        "test@domain.com",
      ])
    } catch (error) {
      console.error(error)
    }
  })

  describe("PUT /learners/pbs", () => {
    it("should update the personal bests of a learner", async () => {
      const newPbs = {
        snatch: 120.35,
        clean: 30.87,
        jerk: 40.21,
        cleanAndJerk: 60.0,
        backSquat: 70.74,
        frontSquat: 90.89,
        pushPress: 100.15,
      }
      const result = await api
        .put("/learners/pbs")
        .set("Authorization", `Bearer ${LEARNER_TEST_TOKEN}`)
        .send({ newPbs })
      expect(result.status).toEqual(204)
    })
  })

  describe("GET /learners/pbs", () => {
    it("should retrieve the personal bests of a learner", async () => {
      const expected = {
        snatch: 120.35,
        clean: 30.87,
        jerk: 40.21,
        cleanAndJerk: 60.0,
        backSquat: 70.74,
        frontSquat: 90.89,
        pushPress: 100.15,
      }

      const result = await api
        .get("/learners/pbs")
        .set("Authorization", `Bearer ${LEARNER_TEST_TOKEN}`)

      expect(result.status).toEqual(200)
      expect(result.body).toEqual(expected)
    })
  })

  describe("POST /learners/login", () => {
    it("should return all the learner's pbs, schedule_names, schedule_ids, and their week_counts if credentials are correct", async () => {
      const loginCredentials = {
        username: "thomash",
        password: "password",
      }

      const expected = {
        pbs: {
          snatch: 120.35,
          clean: 30.87,
          jerk: 40.21,
          cleanAndJerk: 60,
          backSquat: 70.74,
          frontSquat: 90.89,
          pushPress: 100.15,
        },
        schedules: [
          {
            scheduleId: 138,
            scheduleName: "Youth/Junior Hypertrophy Jan 2021",
            weekCount: 5,
            programmeName: "Youth and Junior",
          },
        ],
        learnerName: "Harry Thomas",
      }

      const result = await api.post("/learners/login").send(loginCredentials)

      expect(result.status).toEqual(200)
      expect(result.body).toHaveProperty("pbs")
      expect(result.body).toHaveProperty("schedules")
      expect(result.body).toHaveProperty("token")
      expect(result.body).toHaveProperty("learnerName")
      expect(result.body.pbs).toEqual(expected.pbs)
      expect(result.body.schedules).toEqual(expected.schedules)
      expect(result.body.learnerName).toEqual(expected.learnerName)
    })
  })

  describe("PUT /learners/practice.bests", () => {
    it("should update a practice best of a learner", async () => {
      const payload = {
        pbId: 68,
        weight: 200,
        repMax: "x10",
      }

      const result = await api
        .put("/learners/practice.bests")
        .set("Authorization", `Bearer ${LEARNER_TEST_TOKEN}`)
        .send(payload)

      const { rows } = await pool.query(
        `SELECT weight, "repMax", CAST("lastEdited" AS TEXT) FROM practice_bests WHERE "pbId" = ${payload.pbId}`
      )

      expect(result.status).toEqual(204)
      expect(parseFloat(rows[0].weight)).toEqual(200)
      expect(rows[0].repMax).toEqual("x10")
      expect(rows[0].lastEdited).toEqual(
        new Date().toISOString().substring(0, 10)
      )
    })
  })

  describe("GET /learners/practice.bests/:exerciseName", () => {
    it("should get all the available records of an exercise", async () => {
      const expected = [
        {
          pbId: 69,
          learnerId: 45,
          exerciseName: "snatch",
          repMax: "x10",
          weight: "230.00",
        },
        {
          pbId: 68,
          learnerId: 45,
          exerciseName: "snatch",
          repMax: "x10",
          weight: "200.00",
        },
      ]

      const result = await api
        .get("/learners/practice.bests/snatch")
        .set("Authorization", `Bearer ${LEARNER_TEST_TOKEN}`)

      console.log(result.body)

      expect(result.status).toEqual(200)
      expect(result.body.length).toEqual(2)
      result.body.forEach((pb: any, idx: number) => {
        expect(pb).toMatchObject(expected[idx])
      })
    })
  })

  describe("POST /learners/practice.bests", () => {
    it("should return all the posted info plus the pbId", async () => {
      const payload = {
        exerciseName: "power jerk",
        repMax: "x3",
        weight: "120.00",
      }

      const expected = {
        exerciseName: "power jerk",
        repMax: "x3",
        weight: "120.00",
        lastEdited: new Date().toISOString().substring(0, 10),
      }

      const result = await api
        .post("/learners/practice.bests")
        .set("Authorization", `Bearer ${LEARNER_TEST_TOKEN}`)
        .send(payload)

      expect(result.status).toEqual(201)
      expect(result.body).toHaveProperty("pbId")
      const { pbId } = result.body
      delete result.body.pbId
      expect(result.body).toEqual(expected)

      try {
        await pool.query(`DELETE FROM practice_bests WHERE "pbId" = $1`, [pbId])
      } catch (error) {
        console.error(error)
      }
    })
  })

  describe("GET /learners/:learnerId/practice.bests", () => {
    it("should get all the available historical pbs of a learner", async () => {
      const expected = [
        {
          pbId: 70,
          exerciseName: "clean",
          repMax: "x1",
          weight: "125.00",
        },
        {
          pbId: 68,
          exerciseName: "snatch",
          repMax: "x10",
          weight: "200.00",
        },
        {
          pbId: 69,
          exerciseName: "snatch",
          repMax: "x10",
          weight: "230.00",
        },
      ]

      const result = await api
        .get("/learners/45/practice.bests")
        .set("Authorization", `Bearer ${LEARNER_TEST_TOKEN}`)

      console.log(result.body)
      expect(result.status).toEqual(200)
      expect(result.body.length).toEqual(3)
      result.body.forEach((pb: any, idx: number) => {
        expect(pb).toMatchObject(expected[idx])
      })
    })
  })

  afterAll(async () => {
    await pool.end()
  })
})
