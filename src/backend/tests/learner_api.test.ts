import app from "../app"
import request from "supertest"
import pool from "../database/pool"

describe("API Integration Tests - Learner Service", () => {
  describe.only("PUT /learners/:learnerId/pbs", () => {
    it("should update the personal bests of a learner", async () => {
      const newPbs = {
        snatch: 0,
        clean: 0,
        jerk: 0,
        cleanAndJerk: 0,
        backSquat: 0,
        frontSquat: 0,
        pushPress: 0,
      }
      const result = await request(app).put("/learners/1/pbs").send(newPbs)
      expect(result.status).toEqual(204)
    })
  })

  describe("POST /learners/login", () => {
    it("should return all schedule_names, schedule_ids, and their week_counts if credentials are correct", async () => {
      const result = await request(app)
        .post("/learner/login")
        .send({ email: "thangnus@gmail.com", password: "password" })
      expect(result.status).toEqual(200)
      const expected = [
        {
          schedule_name: "October 2020 Youth and Junior",
          week_count: 4,
          schedule_id: 3,
          programme_name: "Youth and Junior",
        },
        {
          schedule_name: "November 2020 Youth and Junior",
          week_count: 6,
          schedule_id: 4,
          programme_name: "Youth and Junior",
        },
        {
          schedule_name: "September 2020 Strength",
          week_count: 5,
          schedule_id: 1,
          programme_name: "Youth and Junior",
        },
      ]

      expect(result.body).toEqual(expected)
    })
  })

  // programme/1/schedule/1/week/1
  describe("GET /schedules/:scheduleId/weeks/:week", () => {
    it("should return an object with the name, programme, and schedule for the specified week", async () => {
      const result = await request(app).get("/schedules/1/weeks/2")

      expect(result.status).toEqual(200)

      const { week_2 } = result.body

      const expectedDays = ["day 1", "day 2", "day 2.5", "day 3", "day 3.5"]
      expectedDays.forEach((day) => {
        expect(Object.keys(week_2)).toContain(day)
      })
    })
  })

  afterAll(async () => {
    await pool.end()
  })
})
//need to match my routes to my queries before writing tests
