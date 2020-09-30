import { appConfig } from "../utils/config"
import { api } from "./testHelper"
import { pool } from "../database/register"

jest.setTimeout(30000)

describe("API Integration Tests - Schedule Service", () => {
  describe("GET /programmes", () => {
    it("should return an array of object containing programmeName, Id, and scheduleIds", async () => {
      //SECTION: ARRANGE
      const expected = [
        {
          programmeName: "Youth and Junior",
          programmeId: 1,
          scheduleIds: [6],
        },
      ]

      //SECTION: ACT
      const response = await api
        .get("/programmes")
        .set("Authorization", `Bearer ${appConfig.TEST_TOKEN}`)

      //SECTION: ASSERT
      expect(response.status).toEqual(200)
      expect(response.body).toHaveProperty("token")
      expect(response.body.token.data).toEqual({ learnerId: 1 })
      expect(response.body).toHaveProperty("programmes")
      response.body.programmes.forEach((programme: any) => {
        expect(programme).toHaveProperty("programmeName")
        expect(programme).toHaveProperty("programmeId")
        expect(programme).toHaveProperty("scheduleIds")
      })
      expect(response.body.programmes).toEqual(expected)
    })
  })

  describe("GET /programmes/schedules/:scheduleId/weeks/:week", () => {
    it("should return an object with the name, programme, and schedule for the specified week", async () => {
      //SECTION: ARRANGE
      const expectedDays = ["day 1", "day 2", "day 2.5", "day 3"]

      //SECTION: ACT
      const result = await api
        .get("/programmes/schedules/6/weeks/2")
        .set("Authorization", `Bearer ${appConfig.TEST_TOKEN}`)

      //SECTION: ASSERT
      expect(result.status).toEqual(200)
      expect(typeof result.body).toBe("string")
      const dailySchedules = JSON.parse(result.body)
      expectedDays.forEach((day) => {
        expect(Object.keys(dailySchedules)).toContain(day)
      })
    })
  })

  //IN DEVELOPMENT INSTRUCTOR PART
  describe("GET /programmes/:programmeId/schedules", () => {
    it.only("should return all schedule names, week counts, and ids of a programme as an array of objects", async () => {
      //SECTION: ARRANGE
      const expected = [
        {
          scheduleId: 1,
          scheduleName: "September 2020 Strength",
          weekCount: 5,
        },
      ]

      //SECTION: ACT
      const response = await api
        .get("/programmes/1/schedules")
        .set("Authorization", `Bearer ${appConfig.TEST_TOKEN}`)

      //SECTION: ASSERT
      expect(response.status).toEqual(200)
      expected.forEach((schedule) =>
        expect(response.body).toContainEqual(schedule)
      )
    })
  })

  describe.skip("POST /schedules", () => {
    it("should create a new schedule", async () => {})
  })

  describe.skip("PUT /programmes/:programmeId/password", () => {
    it("should change the login password of a programme", () => {
      const payload = { newPassword: "password", programmeId: 1 }
      api
        .put(`/programmes/${payload.programmeId}/password`)
        .set("Authorization", `Bearer ${appConfig.TEST_TOKEN}`)
        .set("Content-Type", "application/json")
        .send({ ...payload })
        .expect(204)
        .end((err, res) => {
          if (err) throw err
        })
    })
  })

  describe.skip("POST /programmes/:programmeId/schedules/:scheduleId", () => {
    it("should add/publish a schedule to a programme", async () => {})
  })

  describe.skip("DELETE /programmes/:programmeId/schedules/:scheduleId", () => {
    it("should unpublish a schedule from a programme", async () => {})
  })

  describe.skip("DELETE /programmes/:programmeId/password", () => {
    it("should delete a programme", async () => {})
  })

  describe.skip("DELETE /schedules/:scheduleId", () => {
    it("should delete a schedule and remove it from all programmes", async () => {})
  })

  afterAll(async () => {
    await pool.end()
  })
})
