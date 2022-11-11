import { isEmail } from "./../../utils/register"

describe("Client Input Validators Test", () => {
  describe("Email Validator", () => {
    it("should return TRUE for valid emails", () => {
      const validEmails = [
        //normal
        "email@domain.com",
        //with number
        "email123@domain.com",
        //with dashes
        "email_123@domain.com",
        //with plus sign
        "email+123@domain.com",
        //with multiple words
        "email123.somthing@domain.nz.co",
        //with different cases
        "abcXYZ1239@gmail.com",
      ]

      validEmails.forEach((e) => {
        expect(isEmail(e)).toBe(true)
      })
    })

    it("should return FALSE for invalid emails", () => {
      const invalidEmails = [
        //missing @
        "emaildomain.com",
        //no word following @
        "email123@",
        //using special char
        "$%@yahoo.com",
      ]

      invalidEmails.forEach((e) => {
        expect(isEmail(e)).toBe(false)
      })
    })
  })
})
