import { pool } from "../database/register"
import { api } from "./testHelper"
import { appConfig } from "../utils/register"

jest.setTimeout(30000)

describe("API Integration Tests - Learner Service", () => {
  describe("POST /learners/signup", () => {
    it("should create a new user in the database and initialise their personal bests", async () => {
      //SECTION: arrange
      const newLearnerInfo = {
        firstName: "test",
        lastName: "test",
        email: "test@domain.com",
        programmeId: 1,
      }

      //SECTION: act
      const result = await api.post("/learners/signup").send(newLearnerInfo)

      //SECTION: assert
      expect(result.status).toEqual(201)
      expect(result.body).toEqual(newLearnerInfo)

      //SECTION: clean up
      try {
        await pool.query(`DELETE FROM learner WHERE email = $1`, [
          newLearnerInfo.email,
        ])
      } catch (error) {
        console.error(error)
      }
    })
  })
  //Callan can also use this
  describe("PUT /learners/pbs", () => {
    it("should update the personal bests of a learner", async () => {
      const newPbs = {
        snatch: 120.35,
        clean: 30.87,
        jerk: 40.21,
        cleanAndJerk: 60.0,
        backSquat: 70.74,
        frontSquat: 90.89,
        pushPress: 100.15,
      }
      const result = await api
        .put("/learners/pbs")
        .set("Authorization", `Bearer ${appConfig.TEST_TOKEN}`)
        .send({ newPbs })
      expect(result.status).toEqual(204)
    })
  })
  //fixme: no longer uses learnerId in req.param
  describe("GET /learners/pbs", () => {
    it("should retrieve the personal bests of a learner", async () => {
      //SECTION: ARRANGE
      const expected = {
        snatch: 120.35,
        clean: 30.87,
        jerk: 40.21,
        cleanAndJerk: 60.0,
        backSquat: 70.74,
        frontSquat: 90.89,
        pushPress: 100.15,
      }

      //SECTION: ACT
      const result = await api
        .get("/learners/pbs")
        .set("Authorization", `Bearer ${appConfig.TEST_TOKEN}`)

      //SECTION: ASSERT
      expect(result.status).toEqual(200)
      expect(result.body).toEqual(expected)
    })
  })

  //NOTE: this implicitly calls 2 separate handlers (checkCredentials and getAllSchedules)
  describe("POST /learners/login", () => {
    it("should return all the learner's pbs, schedule_names, schedule_ids, and their week_counts if credentials are correct", async () => {
      //SECTION: ARRANGE
      const loginCredentials = {
        email: "thangnus@gmail.com",
        password: "password",
      }

      const expected = {
        learnerId: 1,
        pbs: {
          snatch: 120.35,
          clean: 30.87,
          jerk: 40.21,
          cleanAndJerk: 60.0,
          backSquat: 70.74,
          frontSquat: 90.89,
          pushPress: 100.15,
        },
        schedules: [
          {
            programmeName: "Youth and Junior",
            scheduleName: "September 2020 Strength",
            weekCount: 5,
            scheduleId: 6,
          },
        ],
      }

      //SECTION: ACT
      const result = await api.post("/learners/login").send(loginCredentials)
      expect(result.status).toEqual(200)

      //SECTION: ASSERT
      expect(result.body).toHaveProperty("pbs")
      expect(result.body).toHaveProperty("schedules")
      expect(result.body).toHaveProperty("token")
      expect(result.body.pbs).toEqual(expected.pbs)
      expect(result.body.schedules).toEqual(expected.schedules)
    })
  })

  describe("GET /learners", () => {
    it("should get all learners names, ids and the programmes they're following", async () => {})
  })

  afterAll(async () => {
    await pool.end()
  })
})