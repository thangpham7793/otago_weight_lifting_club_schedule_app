const { calculateRealWeight } = require("./calculateRealWeight")
const { pbsToExercises } = require("../../data")
const { getStore } = require("../../utils")

const getMatchedPbValue = (exerciseName) => {
  const matchedPb = Object.keys(pbsToExercises).filter((k) => {
    //console.log(exercise)
    return pbsToExercises[k]
      .map((exerciseName) => exerciseName.toLowerCase())
      .includes(exerciseName.toLowerCase().replace("optional: ", ""))
  })[0]
  return getStore().pbs[matchedPb]
}

//dynamic rendering based on data
function makeExerciseRow(exerciseInfo) {
  const { exerciseName, instruction } = exerciseInfo
  const matchedPbValue = getMatchedPbValue(exerciseName)

  //convert to % if there's a matched PB, otherwise return the instruction
  const processedInstruction = matchedPbValue
    ? calculateRealWeight(instruction, matchedPbValue)
    : instruction
  return `<tr class="timetable-row">
  <td class="timetable-cell">
  ${exerciseName}
  </td>
  <td class="timetable-cell">
  ${processedInstruction}
  </td>
</tr>`
}

function makeExerciseRows(exercises) {
  return exercises.reduce((strAcc, exercise) => {
    return strAcc + makeExerciseRow(exercise)
  }, "")
}

module.exports = { makeExerciseRows }
