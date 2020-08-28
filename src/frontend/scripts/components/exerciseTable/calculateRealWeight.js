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

module.exports = { calculateRealWeight }
