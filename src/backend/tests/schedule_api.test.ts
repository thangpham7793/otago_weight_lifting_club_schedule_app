import { api } from "./testHelper"
import pool from "../database/pool"

jest.setTimeout(30000)
const TEST_COOKIE =
  "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsZWFybmVySWQiOjEsImlhdCI6MTU5OTgyNTY5OH0.vhbqD8U6ZsGZ_Ost5qgcM2QKGPf1N-VsTjrLw-ukVnc"

describe("API Integration Tests - Schedule Service", () => {
  describe.only("GET /programmes", () => {
    it("should return an array of object containing programmeName and Id", async () => {
      const expected = [
        { programmeName: "Youth and Junior", programmeId: 1 },
        { programmeName: "Senior", programmeId: 2 },
      ]
      const response = await api.get("/programmes")
      expect(response.status).toEqual(200)
      response.body.forEach((programme: any) => {
        expect(programme).toHaveProperty("programmeName")
        expect(programme).toHaveProperty("programmeId")
      })
      expect(response.body).toEqual(expected)
    })
  })

  describe.only("GET /schedules/:scheduleId/weeks/:week", () => {
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

  describe.only("GET /programmes/:programmeId/schedules", () => {
    it("should return all schedule names, week counts, and ids of a programme as an array of objects", async () => {
      const response = await api.get("/programmes/1/schedules")
      expect(response.status).toEqual(200)
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
        expect(response.body).toContainEqual(schedule)
      )
    })
  })

  //top priority
  describe("POST /schedules", () => {
    it("should create a new schedule", async () => {})
  })

  describe("POST /programmes/:programmeId/password", () => {
    it("should change the login password of a programme", async () => {})
  })

  describe("POST /programmes/:programmeId/schedules/:scheduleId", () => {
    it("should add/publish a schedule to a programme", async () => {})
  })

  describe("DELETE /programmes/:programmeId/schedules/:scheduleId", () => {
    it("should unpublish a schedule from a programme", async () => {})
  })

  describe("DELETE /programmes/:programmeId/password", () => {
    it("should delete a programme", async () => {})
  })

  describe("DELETE /schedules/:scheduleId", () => {
    it("should delete a schedule and remove it from all programmes", async () => {})
  })

  afterAll(async () => {
    await pool.end()
  })
})
