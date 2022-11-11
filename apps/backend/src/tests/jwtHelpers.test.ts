import { makeToken } from "../utils/jwtHelpers"
import jwt from "jsonwebtoken"

describe("UNIT TEST: function makeToken", () => {
  it("should create a valid token from a payload and return that payload when decoded", async () => {
    const payload = { learnerId: 1 }
    const expected = {
      data: { learnerId: 1 },
      exp: 1603870601,
      iat: 1601451401,
    }

    const token = await makeToken(payload)
    const decoded = await jwt.verify(token, "secret")

    expect(decoded).toHaveProperty("data")
    expect(decoded).toHaveProperty("exp")
    expect(decoded).toHaveProperty("iat")
    expect(Object.values(decoded)).toContainEqual({ learnerId: 1 })
  })
})
