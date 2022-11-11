import { api, INSTRUCTOR_TEST_TOKEN } from "../testHelper"
import { pool } from "../../database/register"

describe("API Integration Tests - Instructor Service", () => {
  describe("POST /instructor/login", () => {
    it("should return all programmeIds, programmeNames, and scheduleIds when credentials are correct", async () => {
      const instructorCredentials = {
        email: "admin@admin.com",
        password: "admin",
      }

      const expected = [
        {
          programmeName: "Youth and Junior",
          programmeId: 1,
        },
        {
          programmeName: "Senior",
          programmeId: 5,
        },
        {
          programmeName: "testing",
          programmeId: 6,
        },
      ]

      const result = await api
        .post("/instructor/login")
        .send(instructorCredentials)

      expect(result.body).toHaveProperty("token")
      expect(result.body).toHaveProperty("programmes")
      expect(result.body.programmes).toEqual(expected)
    })
  })

  describe("POST instructor/password", () => {
    it("should update the instructor password after hashing", async () => {
      const updatePassword = async () =>
        api
          .post("/instructor/password")
          .send({ email: "admin@admin.com", newPassword: "admin" })
          .set("Content-Type", "application/json")
          .set("Authorization", `Bearer ${INSTRUCTOR_TEST_TOKEN}`)
          .expect(204)

      await expect(updatePassword()).resolves.toBeDefined()
    })
  })

  afterAll(async () => {
    await pool.end()
  })
})
