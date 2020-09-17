import { api } from "./testHelper"
import { pool } from "../database/register"

describe("API Integration Tests - Instructor Service", () => {
  describe("POST /instructor/login", () => {
    it("should return all programmeIds, programmeNames, and scheduleIds when credentials are correct", async () => {
      const result = await api
        .post("/instructor/login")
        .send({ email: "callanhelms@gmail.com", password: "password" })
      const expected = {
        programmeName: "Youth and Junior",
        programmeId: 1,
        scheduleIds: [6],
      }

      expect(result.body).toHaveProperty("token")
      expect(result.body).toEqual(expected)
    })
  })

  describe.only("POST instructor/password", () => {
    it("should update the instructor password after hashing", () => {
      return api
        .post("/instructor/password")
        .send({
          newPassword: "admin",
          email: "callanhelms@gmail.com",
        })
        .set("Content-Type", "application/json")
        .expect(204)
    })
  })

  afterAll(async () => {
    await pool.end()
  })
})
