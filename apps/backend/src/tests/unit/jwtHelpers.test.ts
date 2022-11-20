import { makeToken, verifyToken } from "../../utils/jwtHelpers.ts";
import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.160.0/testing/bdd.ts";

describe("makeToken", () => {
  const NOW = Math.floor(Date.now() / 1000);
  const DAYS_IN_SECONDS = 86400;

  it("should create a valid token from a payload and return that payload when decoded", async () => {
    const payload = { learnerId: 1 };

    const expected = {
      data: { learnerId: 1 },
      exp: NOW + 1 * DAYS_IN_SECONDS,
      iat: NOW,
    };

    const token = await makeToken(payload, {
      exp: NOW + 1 * DAYS_IN_SECONDS,
    });
    const decoded = await verifyToken(token);

    assertEquals(decoded, expected);
  });
});
