const assert = require("assert")

const PB = 100

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

const calculateRealWeight = (str, pb) => {
  const result = str
    .split(" ")
    .map((part) => {
      if (part.indexOf("%") > -1) {
        return parsePercent(part, pb)
      } else {
        return part
      }
    })
    .join(" ")

  console.log(result)
  return result
}

describe("The Function Calculate Real Weight", () => {
  it("should convert all % in the instruction string to kilograms", () => {
    const inputString = ["70% 1+1+1r3s", "70% 1+3r3s", "70% 8r1s, 65% 8r1s"]
    const expected = [
      "70kg (70%) 1+1+1r3s",
      "70kg (70%) 1+3r3s",
      "70kg (70%) 8r1s, 65kg (65%) 8r1s",
    ]
    inputString.forEach((str, index) => {
      assert.strictEqual(calculateRealWeight(str, PB), expected[index])
    })
  })

  it("should return the string if there is no percentage", () => {
    const inputString = ["3RIR3s or (RPE6 12r2s)"]
    inputString.forEach((str) => {
      assert.strictEqual(calculateRealWeight(str, PB), str)
    })
  })

  //TODO: reminds Callan to write the formula in a regular, consistent way
  it("should convert all percentages if there's a range", () => {
    const inputString = [
      "90%-95% 1r4s",
      "90-95% 1r4s",
      "90% -95% 1r4s",
      "90% - 95% 1r4s",
    ]
    const expected = [
      "90kg-95kg (90%-95%) 1r4s",
      "90kg-95kg (90-95%) 1r4s",
      "90kg (90%) 95kg (-95%) 1r4s",
      "90kg (90%) - 95kg (95%) 1r4s",
    ]
    inputString.forEach((str) => {
      console.log(calculateRealWeight(str, PB))
      assert.strictEqual(expected.includes(calculateRealWeight(str, PB)), true)
    })
  })
})
