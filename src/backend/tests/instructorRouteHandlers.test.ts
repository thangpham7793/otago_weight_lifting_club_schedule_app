import { api, INSTRUCTOR_TEST_TOKEN } from "./testHelper"
import { pool } from "../database/register"

describe("API Integration Tests - Instructor Service", () => {
  describe("POST /instructor/login", () => {
    it("should return all programmeIds, programmeNames, and scheduleIds when credentials are correct", async () => {
      //SECTION: ARRANGE
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

      //SECTION: ACT
      const result = await api.post("/instructor/login").send({
        email: "admin@admin.com",
        password: "admin",
      })

      //SECTION: ASSERT
      expect(result.body).toHaveProperty("token")
      expect(result.body).toHaveProperty("programmes")
      expect(result.body.programmes).toEqual(expected)
    })
  })
  //this should get receive token
  describe("POST instructor/password", () => {
    it("should update the instructor password after hashing", () => {
      return api
        .post("/instructor/password")
        .send({
          newPassword: "admin",
          email: "admin@admin.com",
        })
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${INSTRUCTOR_TEST_TOKEN}`)
        .expect(204)
        .then(() => {})
        .catch((err) => console.error(err))
    })
  })

  afterAll(async () => {
    await pool.end()
  })
})
