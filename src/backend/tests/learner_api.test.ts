import pool from "../database/pool"
import { api } from "./testHelper"

jest.setTimeout(30000)
const TEST_COOKIE =
  "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZWFybmVySWQiOjEsImlhdCI6MTU5OTgyNTY5OH0.vhbqD8U6ZsGZ_Ost5qgcM2QKGPf1N-VsTjrLw-ukVnc"

describe("API Integration Tests - Learner Service", () => {
  describe.only("GET /learners/signup", () => {
    it("should return redirect user to an html page for signing up", () => {
      api
        .get("/learners/signup")
        .expect("Content-Type", /[text|html]/)
        .expect(200)
    })
  })

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
      const result = await api
        .put("/learners/1/pbs")
        .set("Cookie", [TEST_COOKIE])
        .send(newPbs)
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
      const result = await api
        .get("/learners/1/pbs")
        .set("Cookie", [TEST_COOKIE])
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
      const expected = {
        pbs: {
          snatch: 120.35,
          clean: 30.87,
          jerk: 40.21,
          cleanAndJerk: 60.0,
          backSquat: 70.74,
          frontSquat: 90.89,
          pushPress: 100.15,
        },
        schedules: [
          {
            programmeName: "Youth and Junior",
            scheduleName: "September 2020 Strength",
            weekCount: 5,
            scheduleId: 6,
          },
          {
            programmeName: "Youth and Junior",
            scheduleName: "October 2020 Youth and Junior",
            weekCount: 4,
            scheduleId: 7,
          },
          {
            programmeName: "Youth and Junior",
            scheduleName: "November 2020 Youth and Junior",
            weekCount: 6,
            scheduleId: 8,
          },
        ],
      }
      expect(result.body).toHaveProperty("pbs")
      expect(result.body).toHaveProperty("schedules")
      expect(result.body.pbs).toEqual(expected.pbs)
      expect(result.body.schedules).toEqual(expected.schedules)
    })
  })

  describe("GET /schedules/:scheduleId/weeks/:week", () => {
    it("should return an object with the name, programme, and schedule for the specified week", async () => {
      const result = await api
        .get("/schedules/6/weeks/2")
        .set("Cookie", [TEST_COOKIE])

      expect(result.status).toEqual(200)
      expect(typeof result.body).toBe("string")
      const dailySchedules = JSON.parse(result.body)

      const expectedDays = ["day 1", "day 2", "day 2.5", "day 3"]
      expectedDays.forEach((day) => {
        expect(Object.keys(dailySchedules)).toContain(day)
      })
    })
  })

  afterAll(async () => {
    await pool.end()
  })
})
//need to match my routes to my queries before writing tests
