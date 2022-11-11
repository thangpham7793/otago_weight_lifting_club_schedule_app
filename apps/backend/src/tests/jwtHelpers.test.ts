import { makeToken } from "../utils/jwtHelpers"
import jwt from "jsonwebtoken"

describe("UNIT TEST: function makeToken", () => {
  const NOW = Math.floor(Date.now() / 1000)
  const DAYS_IN_SECONDS = 86400
  const DEFAULT_TOKEN_DURATION_IN_DAYS = 28

  it("should create a valid token from a payload and return that payload when decoded", async () => {
    const payload = { learnerId: 1 }

    const expected = {
      data: { learnerId: 1 },
      exp: NOW + DEFAULT_TOKEN_DURATION_IN_DAYS * DAYS_IN_SECONDS,
      iat: NOW,
    }

    const token = await makeToken(payload)
    const decoded = await jwt.verify(token, "secret")

    expect(decoded).toStrictEqual(expected)
  })
})
