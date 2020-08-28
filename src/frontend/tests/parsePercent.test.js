const assert = require("assert")

const parsePercent = (str, pb) => {
  const elements = str.split("-").filter((str) => str !== "")
  const result = elements
    .map((str) => {
      const percent = Math.abs(parseInt(str))
      return ((percent * pb) / 100).toFixed() + "kg"
    })
    .join("-")
  return `${result} (${str})`
}

describe("The Function Parse Percent", () => {
  it("should return all numbers in a string with kg", () => {
    const inputString = [
      "70%",
      "70-90%",
      "70%-90%",
      "70 - 90%",
      "70% - 90%",
      "70 -90%",
      "70% -90%",
    ]
    const expected = [
      "70kg (70%)",
      "70kg-90kg (70-90%)",
      "70kg-90kg (70%-90%)",
      "70kg-90kg (70 - 90%)",
      "70kg-90kg (70% - 90%)",
      "70kg-90kg (70 -90%)",
      "70kg-90kg (70% -90%)",
    ]
    inputString.forEach((str, index) => {
      assert.strictEqual(parsePercent(str, 100), expected[index])
    })
  })
})
