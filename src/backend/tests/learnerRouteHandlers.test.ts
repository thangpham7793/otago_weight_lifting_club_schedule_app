import { pool } from "../database/register"
import { api, LEARNER_TEST_TOKEN } from "./testHelper"

jest.setTimeout(30000)

describe("API Integration Tests - Learner Service", () => {
  describe("POST /learners/signup", () => {
    it("should create a new user in the database and initialise their personal bests", async () => {
      //SECTION: arrange
      const newLearnerInfo = {
        firstName: "john",
        lastName: "doe",
        email: "test@domain.com",
        programmeId: 1,
      }

      //SECTION: act
      const result = await api.post("/learners/signup").send(newLearnerInfo)

      //SECTION: assert
      expect(result.status).toEqual(201)
      expect(result.body).toHaveProperty("username")
      expect(result.body.username).toEqual(`doej`)

      //SECTION: clean up
      try {
        await pool.query(`DELETE FROM learner WHERE email = $1`, [
          newLearnerInfo.email,
        ])
      } catch (error) {
        console.error(error)
      }
    })
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
  //fixme: no longer uses learnerId in req.param
  describe("GET /learners/pbs", () => {
    it("should retrieve the personal bests of a learner", async () => {
      //SECTION: ARRANGE
      const expected = {
        snatch: 120.35,
        clean: 30.87,
        jerk: 40.21,
        cleanAndJerk: 60.0,
        backSquat: 70.74,
        frontSquat: 90.89,
        pushPress: 100.15,
      }

      //SECTION: ACT
      const result = await api
        .get("/learners/pbs")
        .set("Authorization", `Bearer ${LEARNER_TEST_TOKEN}`)

      //SECTION: ASSERT
      expect(result.status).toEqual(200)
      expect(result.body).toEqual(expected)
    })
  })

  //NOTE: this implicitly calls 2 separate handlers (checkCredentials and getAllSchedules)
  describe("POST /learners/login", () => {
    it("should return all the learner's pbs, schedule_names, schedule_ids, and their week_counts if credentials are correct", async () => {
      //SECTION: ARRANGE
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
            scheduleId: 12,
            scheduleName: "October 2020 Peaking Cycle",
            weekCount: 6,
            programmeName: "Youth and Junior",
          },
          {
            scheduleId: 6,
            scheduleName: "September 2020 Strength",
            weekCount: 5,
            programmeName: "Youth and Junior",
          },
        ],
        learnerName: "Harry Thomas",
      }

      //SECTION: ACT
      const result = await api.post("/learners/login").send(loginCredentials)

      //SECTION: ASSERT
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

  describe("GET /learners", () => {
    it("should get all learners names, ids and the programmes they're following", async () => {})
  })

  describe("PUT /learners/practice.bests", () => {
    it("should update a practice best of a learner", async () => {
      const payload = {
        pbId: 1,
        weight: 200,
        repMax: "x10",
      }

      const result = await api
        .put("/learners/practice.bests")
        .set("Authorization", `Bearer ${LEARNER_TEST_TOKEN}`)
        .send(payload)

      const { rows } = await pool.query(
        `SELECT weight, "repMax", CAST("lastEdited" AS TEXT) FROM practice_bests WHERE "pbId" = 1`
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
          pbId: 7,
          learnerId: 1,
          exerciseName: "clean and jerk",
          repMax: "x4",
          weight: "100.00",
          lastEdited: "2020-10-20",
        },
        {
          pbId: 8,
          learnerId: 1,
          exerciseName: "clean and jerk",
          repMax: "x5",
          weight: "100.00",
          lastEdited: "2020-10-20",
        },
        {
          pbId: 9,
          learnerId: 1,
          exerciseName: "clean and jerk",
          repMax: "x7",
          weight: "100.00",
          lastEdited: "2020-10-20",
        },
        {
          pbId: 10,
          learnerId: 1,
          exerciseName: "clean and jerk",
          repMax: "x8",
          weight: "100.00",
          lastEdited: "2020-10-15",
        },
      ]

      const result = await api
        .get("/learners/practice.bests/clean%20and%20jerk")
        .set("Authorization", `Bearer ${LEARNER_TEST_TOKEN}`)

      expect(result.status).toEqual(200)
      expect(result.body.length).toEqual(4)
      expect(result.body).toEqual(expected)
    })
  })

  describe("POST /learners/practice.bests", () => {
    it("should return all the posted info plus the pbId", async () => {
      //SECTION: ARRANGE
      const payload = {
        exerciseName: "power jerk",
        repMax: "x3",
        weight: "120.00",
      }

      const expected = {
        exerciseName: "power jerk",
        repMax: "x3",
        weight: "120.00",
        lastEdited: new Date().toISOString().substr(0, 10),
      }

      //SECTION: ACT
      const result = await api
        .post("/learners/practice.bests")
        .set("Authorization", `Bearer ${LEARNER_TEST_TOKEN}`)
        .send(payload)

      //SECTION: ASSERT
      expect(result.status).toEqual(201)
      expect(result.body).toHaveProperty("pbId")
      const { pbId } = result.body
      delete result.body.pbId
      expect(result.body).toEqual(expected)

      //SECTION: clean up
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
          pbId: 30,
          exerciseName: "clean",
          repMax: "x1",
          weight: "120.45",
          lastEdited: "2020-10-25",
        },
        {
          pbId: 31,
          exerciseName: "clean",
          repMax: "x1",
          weight: "100.00",
          lastEdited: "2020-10-25",
        },
        {
          pbId: 3,
          exerciseName: "clean",
          repMax: "x7",
          weight: "100.00",
          lastEdited: "2020-10-20",
        },
        {
          pbId: 4,
          exerciseName: "clean",
          repMax: "x8",
          weight: "100.00",
          lastEdited: "2020-10-15",
        },
        {
          pbId: 15,
          exerciseName: "clean and jerk",
          repMax: "x1",
          weight: "110.00",
          lastEdited: "2020-10-25",
        },
        {
          pbId: 22,
          exerciseName: "clean and jerk",
          repMax: "x1",
          weight: "120.00",
          lastEdited: "2020-10-24",
        },
        {
          pbId: 26,
          exerciseName: "clean and jerk",
          repMax: "x1",
          weight: "100.00",
          lastEdited: "2020-10-24",
        },
        {
          pbId: 29,
          exerciseName: "clean and jerk",
          repMax: "x3",
          weight: "100.00",
          lastEdited: "2020-10-24",
        },
        {
          pbId: 11,
          exerciseName: "clean and jerk",
          repMax: "x3",
          weight: "97.00",
          lastEdited: "2020-10-23",
        },
        {
          pbId: 21,
          exerciseName: "clean and jerk",
          repMax: "x4",
          weight: "120.00",
          lastEdited: "2020-10-24",
        },
        {
          pbId: 28,
          exerciseName: "clean and jerk",
          repMax: "x6",
          weight: "100.00",
          lastEdited: "2020-10-24",
        },
        {
          pbId: 7,
          exerciseName: "clean and jerk",
          repMax: "x7",
          weight: "120.45",
          lastEdited: "2020-10-25",
        },
        {
          pbId: 24,
          exerciseName: "clean and jerk",
          repMax: "x7",
          weight: "100.00",
          lastEdited: "2020-10-24",
        },
        {
          pbId: 8,
          exerciseName: "clean and jerk",
          repMax: "x8",
          weight: "120.45",
          lastEdited: "2020-10-25",
        },
        {
          pbId: 23,
          exerciseName: "clean and jerk",
          repMax: "x10",
          weight: "100.00",
          lastEdited: "2020-10-24",
        },
        {
          pbId: 20,
          exerciseName: "snatch",
          repMax: "x1",
          weight: "100.00",
          lastEdited: "2020-10-24",
        },
        {
          pbId: 16,
          exerciseName: "snatch",
          repMax: "x1",
          weight: "230.00",
          lastEdited: "2020-10-23",
        },
        {
          pbId: 14,
          exerciseName: "snatch",
          repMax: "x4",
          weight: "95.00",
          lastEdited: "2020-10-24",
        },
        {
          pbId: 10,
          exerciseName: "snatch",
          repMax: "x5",
          weight: "120.00",
          lastEdited: "2020-10-23",
        },
        {
          pbId: 27,
          exerciseName: "snatch",
          repMax: "x7",
          weight: "100.00",
          lastEdited: "2020-10-24",
        },
        {
          pbId: 13,
          exerciseName: "snatch",
          repMax: "x10",
          weight: "120.00",
          lastEdited: "2020-10-23",
        },
        {
          pbId: 32,
          exerciseName: "split jerk",
          repMax: "x1",
          weight: "100.00",
          lastEdited: "2020-10-25",
        },
      ]

      const result = await api
        .get("/learners/1/practice.bests")
        .set("Authorization", `Bearer ${LEARNER_TEST_TOKEN}`)

      expect(result.status).toEqual(200)
      expect(result.body.length).toEqual(22)
      expect(result.body).toEqual(expected)
    })
  })

  afterAll(async () => {
    await pool.end()
  })
})
