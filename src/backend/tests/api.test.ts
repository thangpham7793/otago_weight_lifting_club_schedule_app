import app from "../app"
import request from "supertest"
import pool from "../database/pool"

describe("GET / a simple home route", () => {
  it("should return a Hello World message", async () => {
    const result = await request(app).get("/")
    expect(result.text).toEqual("Hello World!")
    expect(result.status).toEqual(200)
  })
})

// programme/1/schedule/1/week/1

describe.only("GET /programme/:programmeId/schedule/:scheduleId/week/:week", () => {
  it("should return an object with the name, programme, and schedule for the specified week", async () => {
    const result = await request(app).get("/programme/1/schedule/1/week/1")

    expect(result.status).toEqual(200)

    const { programme, schedule, week_1 } = result.body

    expect(programme).toEqual("Youth and Junior")
    expect(schedule).toEqual("September 2020 Strength")

    const expectedDays = ["day 1", "day 2", "day 2.5", "day 3", "day 3.5"]
    expectedDays.forEach((day) => {
      expect(Object.keys(week_1)).toContain(day)
    })
  })

  afterAll(async () => {
    await pool.end()
  })
})

//need to match my routes to my queries before writing tests
