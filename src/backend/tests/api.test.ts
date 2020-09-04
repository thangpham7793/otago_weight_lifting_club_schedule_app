import app from "../app"
import request from "supertest"
import pool from "../database/pool"

describe("API Integration Tests", () => {
  describe("POST /learner/login", () => {
    it("should return all schedule_names, schedule_ids, and their week_counts if credentials are correct", async () => {
      const result = await request(app)
        .post("/learner/login")
        .send({ username: "username", password: "password" })
      expect(result.status).toEqual(200)
      const expected = [
        {
          programme_name: "Youth and Junior",
          schedule_name: "September 2020 Strength",
          week_count: 5,
          schedule_id: 1,
        },
        {
          programme_name: "Youth and Junior",
          schedule_name: "October 2020 Youth and Junior",
          week_count: 4,
          schedule_id: 3,
        },
        {
          programme_name: "Youth and Junior",
          schedule_name: "November 2020 Youth and Junior",
          week_count: 6,
          schedule_id: 4,
        },
      ]
      expect(result.body).toEqual(expected)
    })
  })

  describe.skip("GET /programmes/:programmeId/schedules", () => {
    it("should return all schedule_names, schedule_ids, and their week_counts", async () => {
      const result = await request(app).get("/programme/1/schedule")
      expect(result.status).toEqual(200)
    })
  })

  // programme/1/schedule/1/week/1
  describe.only("GET /schedules/:scheduleId/weeks/:week", () => {
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
