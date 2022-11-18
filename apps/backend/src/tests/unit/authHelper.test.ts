import { isEmail } from "./../../utils"
import { describe, it } from "node:test"
import assert from "node:assert/strict"

describe("isEmail", () => {
  it("validates valid emails", () => {
    const validEmails = [
      "email@domain.com",
      "email123@domain.com",
      "email_123@domain.com",
      "email+123@domain.com",
      "email123.somthing@domain.nz.co",
      "abcXYZ1239@gmail.com",
    ]

    validEmails.forEach((e) => {
      assert.equal(true, isEmail(e))
    })
  })

  it("invalidates invalid emails", () => {
    const invalidEmails = [
      //missing @
      "emaildomain.com",
      //no word following @
      "email123@",
      //using special char
      "$%@yahoo.com",
    ]

    invalidEmails.forEach((e) => {
      assert.equal(false, isEmail(e))
    })
  })
})
