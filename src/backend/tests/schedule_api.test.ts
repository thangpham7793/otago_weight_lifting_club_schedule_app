import app from "../app"
import request from "supertest"
import pool from "../database/pool"

describe("API Integration Tests - Schedule Service", () => {
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

  describe("GET /programmes/:programmeId/schedules", async () => {
    it("should return all schedule names, week counts, and ids of a programme as an array of objects", async () => {
      const result = await request(app).get("/programmes/1/schedules")
      expect(result.status).toEqual(200)
      const expected = [
        {
          scheduleId: 3,
          scheduleName: "October 2020 Youth and Junior",
          weekCount: 4,
        },
        {
          scheduleId: 4,
          scheduleName: "November 2020 Youth and Junior",
          weekCount: 6,
        },
        {
          scheduleId: 1,
          scheduleName: "September 2020 Strength",
          weekCount: 5,
        },
      ]

      expected.forEach((schedule) =>
        expect(result.body).toContainEqual(schedule)
      )
    })
  })

  afterAll(async () => {
    await pool.end()
  })
})
//need to match my routes to my queries before writing tests