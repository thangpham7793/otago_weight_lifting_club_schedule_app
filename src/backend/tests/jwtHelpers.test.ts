import { makeToken } from "../utils/jwtHelpers"
import jwt from "jsonwebtoken"

describe("UNIT TEST: function makeToken", () => {
  it("should create a valid token from a payload and return that payload when decoded", async () => {
    const payload = { learnerId: 1 }
    const token = await makeToken(payload)
    const decoded = await jwt.verify(token, "secret")
    expect(decoded).toHaveProperty("learnerId")
    expect(Object.values(decoded)).toContain(1)
  })
})
