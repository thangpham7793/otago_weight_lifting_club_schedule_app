import app from "../app"
import request from "supertest"
import pool from "../database/pool"

describe("API Integration Tests - Instructor Service", () => {
  describe("POST /instructor/login", () => {
    it("should return 200 when credentials are correct", async () => {
      const result = await request(app)
        .post("/instructor/login")
        .send({ email: "callanhelms@gmail.com", password: "password" })
      expect(result.status).toEqual(200)
    })

    it("should return all the programme names and ids as an array of objectsy", async () => {
      const result = await request(app)
        .post("/instructor/login")
        .send({ email: "callanhelms@gmail.com", password: "password" })
      const expected = [
        { programmeName: "Youth and Junior", programmeId: 1 },
        { programmeName: "Senior", programmeId: 2 },
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
