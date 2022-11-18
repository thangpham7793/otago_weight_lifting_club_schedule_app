import { makeToken, verifyToken } from "../../utils/jwtHelpers"
import { describe, it } from "node:test"
import assert from "node:assert/strict"

describe("makeToken", () => {
  const NOW = Math.floor(Date.now() / 1000)
  const DAYS_IN_SECONDS = 86400

  it("should create a valid token from a payload and return that payload when decoded", async () => {
    const payload = { learnerId: 1 }

    const expected = {
      data: { learnerId: 1 },
      exp: NOW + 1 * DAYS_IN_SECONDS,
      iat: NOW,
    }

    const token = await makeToken(payload, {
      expiresIn: "1 day",
    })
    const decoded = verifyToken(token)

    assert.deepEqual(decoded, expected)
  })
})
