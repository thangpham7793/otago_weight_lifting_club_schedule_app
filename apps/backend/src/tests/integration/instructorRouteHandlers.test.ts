import { api, INSTRUCTOR_TEST_TOKEN } from "../testHelper.ts";
import { pool } from "../../database/index.ts";
import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import {
  afterAll,
  describe,
  it,
} from "https://deno.land/std@0.160.0/testing/bdd.ts";
import { assertArrayIncludes } from "https://deno.land/std@0.110.0/testing/asserts.ts";

describe("API Integration Tests - Instructor Service", () => {
  describe("POST /instructor/login", () => {
    it("should return all programmeIds, programmeNames, and scheduleIds when credentials are correct", async () => {
      const instructorCredentials = {
        email: "admin@admin.com",
        password: "admin",
      };

      const expected = [
        {
          programmeName: "Youth and Junior",
          programmeId: 1,
        },
        {
          programmeName: "Senior",
          programmeId: 5,
        },
        {
          programmeName: "testing",
          programmeId: 6,
        },
      ];

      const result = await api
        .post("/instructor/login")
        .send(instructorCredentials);

      assertArrayIncludes(Object.keys(result.body), ["token", "programmes"]);
      assertEquals(result.body.programmes, expected);
    });
  });

  describe("POST instructor/password", () => {
    it("should update the instructor password after hashing", async () => {
      await api
        .post("/instructor/password")
        .send({ email: "admin@admin.com", newPassword: "admin" })
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${INSTRUCTOR_TEST_TOKEN}`)
        .expect(204);
    });
  });

  afterAll(async () => {
    await pool.end();
  });
});
