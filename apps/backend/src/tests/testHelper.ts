import app from "../app"
import request from "supertest"
import { makeToken } from "../utils/jwtHelpers"

export const INSTRUCTOR_TEST_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjY1NzcxMDIsImRhdGEiOnsiaW5zdHJ1Y3RvcklkIjozfSwiaWF0IjoxNjY0MTU3OTAzfQ.Ncs-DtGCj2JD_bPbMNcCTxCZtBZpTxzNEfUhQ9kbUBw"

export const LEARNER_TEST_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjY1NzY2ODQsImRhdGEiOnsibGVhcm5lcklkIjo0NX0sImlhdCI6MTY2NDE1NzQ4NX0.D1_mZkRv8Ew71_5-FRSlZuxSUR_7-D1wPij3Vp-PgOo"

export const api = request(app)
