const { pbsToExercises } = require("../../data")
const { getPbs } = require("../pbsForm/pbsData")
const { getTwoDecimalRate } = require("../../utils")

const pbs = getPbs().reduce((obj, pb) => {
  obj[pb.name] = pb.value
  return obj
}, {})

function calculateRealWeight(exercise, scale) {
  if (scale.indexOf("%") > 0) {
    const rate = parseFloat(scale) / 100
    const matchedPb = Object.keys(pbsToExercises).filter((k) => {
      return pbsToExercises[k].includes(exercise)
    })[0]
    if (matchedPb) {
      console.log(matchedPb)
      let pbWeight
      try {
        pbWeight = pbs[matchedPb]
      } catch (error) {
        console.log(error)
      } finally {
        //if there's an available pbWeight
        if (pbWeight) {
          return `${getTwoDecimalRate(rate) * pbWeight}kg (${scale})`
        } else {
          //if not available, return the %
          return scale
        }
      }
    } else {
      return scale
    }
  } else {
    return scale
  }
}

module.exports = { calculateRealWeight }
