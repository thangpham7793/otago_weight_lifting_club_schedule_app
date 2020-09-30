import { makeToken } from "../utils/jwtHelpers"
import jwt from "jsonwebtoken"

describe("UNIT TEST: function makeToken", () => {
  it("should create a valid token from a payload and return that payload when decoded", async () => {
    //arrange
    const payload = { learnerId: 1 }
    const expected = {
      data: { learnerId: 1 },
      exp: 1603870601,
      iat: 1601451401,
    }

    //act
    const token = await makeToken(payload)
    const decoded = await jwt.verify(token, "secret")

    //assert
    expect(decoded).toHaveProperty("data")
    expect(decoded).toHaveProperty("exp")
    expect(decoded).toHaveProperty("iat")
    expect(Object.values(decoded)).toContainEqual({ learnerId: 1 })
  })
})
