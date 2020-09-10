import pool from "../database/pool"
import { api } from "./testHelper"

jest.setTimeout(30000)

describe("API Integration Tests - Learner Service", () => {
  describe("POST /learners/signup", () => {
    it("should create a new user in the database and initialise their personal bests", async () => {
      const newLearnerInfo = {
        firstName: "test",
        lastName: "test",
        email: "test@domain.com",
        programmeId: 1,
      }

      const result = await api.post("/learners/signup").send(newLearnerInfo)

      //clean up
      try {
        await pool.query(`DELETE FROM learner WHERE email = $1`, [
          newLearnerInfo.email,
        ])
      } catch (error) {
        console.error(error)
      }

      expect(result.status).toEqual(201)
      expect(result.body).toEqual(newLearnerInfo)
    })
  })

  describe("GET /learners/:learnerId/pbs", () => {
    it("should return all the pbs of a learner", async () => {
      const expected = {
        snatch: 120,
        clean: 30,
        jerk: 40,
        cleanAndJerk: 60,
        backSquat: 70,
        frontSquat: 90,
        pushPress: 100,
      }
      const result = await api.get("/learners/1/pbs")
      expect(result.status).toEqual(200)
    })
  })

  describe("PUT /learners/:learnerId/pbs", () => {
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
      const result = await api.put("/learners/1/pbs").send(newPbs)
      expect(result.status).toEqual(204)
    })
  })

  describe("GET /learners/:learnerId/pbs", () => {
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
      const result = await api.get("/learners/1/pbs")
      expect(result.status).toEqual(200)
      expect(result.body).toEqual(expected)
    })
  })
  //NOTE: this implicitly calls 2 separate handlers (checkCredentials and getAllSchedules)
  describe("POST /learners/login", () => {
    it("should return all schedule_names, schedule_ids, and their week_counts if credentials are correct", async () => {
      const result = await api
        .post("/learners/login")
        .send({ email: "thangnus@gmail.com", password: "password" })
      expect(result.status).toEqual(200)
      const expected = [
        {
          scheduleName: "October 2020 Youth and Junior",
          weekCount: 4,
          scheduleId: 7,
        },
        {
          scheduleName: "November 2020 Youth and Junior",
          weekCount: 6,
          scheduleId: 8,
        },
        {
          scheduleName: "September 2020 Strength",
          weekCount: 5,
          scheduleId: 6,
        },
      ]
      expected.forEach((expectedResult) => {
        expect(result.body).toContainEqual(expectedResult)
      })
    })
  })

  describe("GET /schedules/:scheduleId/weeks/:week", () => {
    it("should return an object with the name, programme, and schedule for the specified week", async () => {
      const result = await api.get("/schedules/6/weeks/2")

      expect(result.status).toEqual(200)
      expect(result.body).toHaveProperty("week_2")
      const { week_2 } = result.body

      const expectedDays = ["day 1", "day 2", "day 2.5", "day 3"]
      expectedDays.forEach((day) => {
        expect(Object.keys(JSON.parse(week_2))).toContain(day)
      })
    })
  })

  afterAll(async () => {
    await pool.end()
  })
})
//need to match my routes to my queries before writing tests
