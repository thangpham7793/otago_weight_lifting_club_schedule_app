import { api } from "./testHelper"
import { pool } from "../database/register"

const TEST_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDI4ODY2NzQsImRhdGEiOnsiaW5zdHJ1Y3RvcklkIjoxfSwiaWF0IjoxNjAwNDY3NDc3fQ.pgIZk4FLVH3-LAT3GM8XnSEmJ0y31fXb5DiuPkjT0rk`

describe("API Integration Tests - Instructor Service", () => {
  describe("POST /instructor/login", () => {
    it("should return all programmeIds, programmeNames, and scheduleIds when credentials are correct", async () => {
      const result = await api
        .post("/instructor/login")
        .send({ email: "callanhelms@gmail.com", password: "admin" })
      const expected = [
        {
          programmeId: 1,
          programmeName: "Youth and Junior",
          scheduleIds: [6],
        },
      ]
      console.log(result.body.token)
      expect(result.body).toHaveProperty("token")
      expect(result.body).toHaveProperty("programmes")
      expect(result.body.programmes).toEqual(expected)
    })
  })
  //this should get receive token
  describe.only("POST instructor/password", () => {
    it("should update the instructor password after hashing", async () => {
      return api
        .post("/instructor/password")
        .send({
          newPassword: "admin",
          email: "callanhelms@gmail.com",
        })
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${TEST_TOKEN}`)
        .expect(204)
        .then((res) => console.log(res))
        .catch((err) => console.error(err))
    })
  })

  afterAll(async () => {
    await pool.end()
  })
})
