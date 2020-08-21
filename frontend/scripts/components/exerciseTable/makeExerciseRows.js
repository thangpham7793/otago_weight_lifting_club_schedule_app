const { calculateRealWeight } = require("./calculateRealWeight")

//dynamic rendering based on data
function makeExerciseRow(exerciseInfo) {
  const { exerciseName, options } = exerciseInfo
  let instruction
  if (options.length === 1) {
    instruction = options[0]
    const calculatedScale = calculateRealWeight(exerciseName, instruction.scale)
    return `<tr>
              <td>
              ${exerciseName}
              </td>
              <td>
              ${calculatedScale} ${instruction.repSet}
              </td>
            </tr>`
  } else {
    const optionsStr = options.reduce((strAcc, instruction, index) => {
      //last one don't add OR

      const calculatedScale = calculateRealWeight(
        exerciseName,
        instruction.scale
      )

      if (index == options.length - 1) {
        return strAcc + `${calculatedScale} ${instruction.repSet}`
      } else {
        return strAcc + `${calculatedScale} ${instruction.repSet} OR `
      }
    }, "")
    return `<tr>
              <td>
              ${exerciseName}
              </td>
              <td>
                ${optionsStr}
              </td>
            </tr>`
  }
}

function makeExerciseRows(exercises) {
  return exercises.reduce((strAcc, exercise) => {
    return strAcc + makeExerciseRow(exercise)
  }, "")
}

module.exports = { makeExerciseRows }
