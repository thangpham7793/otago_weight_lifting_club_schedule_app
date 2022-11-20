import { assertEquals } from "https://deno.land/std@0.165.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.160.0/testing/bdd.ts";
import { isEmail } from "../../utils/auth.ts";

describe("isEmail", () => {
  it("validates valid emails", () => {
    const validEmails = [
      "email@domain.com",
      "email123@domain.com",
      "email_123@domain.com",
      "email+123@domain.com",
      "email123.somthing@domain.nz.co",
      "abcXYZ1239@gmail.com",
    ];

    validEmails.forEach((e) => {
      assertEquals(true, isEmail(e));
    });
  });

  it("invalidates invalid emails", () => {
    const invalidEmails = [
      //missing @
      "emaildomain.com",
      //no word following @
      "email123@",
      //using special char
      "$%@yahoo.com",
    ];

    invalidEmails.forEach((e) => {
      assertEquals(false, isEmail(e));
    });
  });
});
