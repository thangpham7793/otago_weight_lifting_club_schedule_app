import { api } from "./testHelper"
import { pool } from "../database/register"
import { appConfig } from "../utils/register"

//TODO: may need to change this
describe("API Integration Tests - Instructor Service", () => {
  describe("POST /instructor/login", () => {
    it("should return all programmeIds, programmeNames, and scheduleIds when credentials are correct", async () => {
      //SECTION: ARRANGE
      const expected = [
        {
          programmeId: 1,
          programmeName: "Youth and Junior",
          scheduleIds: [6],
        },
      ]

      //SECTION: ACT
      const result = await api
        .post("/instructor/login")
        .send({ email: "callanhelms@gmail.com", password: "admin" })

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
          email: "callanhelms@gmail.com",
        })
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${appConfig.TEST_TOKEN}`)
        .expect(204)
        .then(() => {})
        .catch((err) => console.error(err))
    })
  })

  afterAll(async () => {
    await pool.end()
  })
})
