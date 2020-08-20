const schedule = (function () {
  //replaced by API later
  //scale should be optional.
  //user can type in percentage, rir, or rep (23%, 3RIR, 6REP)
  //should have auto-suggest feature
  //that's why it's unidirectional. The data flows down.
  const dataURL = "data/schedule.json"

  //actual values
  //watch out for cases when some or all pbs are unavailable
  const pbs = {
    snatch: 67,
    clean: 186,
    jerk: 230,
    cleanAndJerk: 175,
    backSquat: 165,
    frontSquat: 112,
    pushPress: 131,
  }
  //probably need a conversion dictionary
  //will there be exercises that can appear in any scale?
  const pbsToExercises = {
    snatch: [
      "Snatch",
      "Power Snatch",
      "Hang Snatch",
      "High Hang Snatch",
      "Hang Snatch Below Knee",
      "Hang Snatch Just Off the Floor",
      "Hang Power Snatch",
      "Block Snatch",
      "Low Block Snatch",
      "Block Power Snatch",
      "Low Block Power Snatch",
      "Muscle Snatch",
      "Deficit Snatch",
      "Snatch Balance",
      "Overhead Squat",
      "Snatch Pull",
      "Snatch Deadlift",
      "Block Snatch Pull",
      "Snatch Romanian Deadlift",
      "Snatch Push Press",
      "3 Position Snatch",
      "3 position snatch (High Hang, Below Knee, Floor)",
      "2 Position Snatch",
      "Pause Snatch",
      "Snatch Pull + Snatch",
      "Snatch + Overhead Squat",
      "Snatch Push Press + Overhead Squat",
      "Deficit Snatch Pull",
    ],
    clean: [
      "Clean",
      "Power Clean",
      "Hang Clean",
      "High Hang Clean",
      "Hang Snatch Below Knee",
      "Hang Clean Just Off the Floor",
      "Hang Power Clean",
      "Block Clean",
      "Low Block Clean",
      "Block Power Clean",
      "Low Block Power Clean",
      "Muscle Clean",
      "Deficit Clean",
      "Clean Pull",
      "Clean Deadlift",
      "Block Clean Pull",
      "Clean Romanian Deadlift",
      "3 Position Clean",
      "2 Position Snatch",
      "Pause Clean",
      "Clean Pull + Clean",
      "Clean + Front Squat",
      "Deficit Clean Pull",
    ],
    jerk: [
      "Jerk",
      "Split Jerk",
      "Power Jerk",
      "Front Squat + Jerk",
      "Power Jerk + Split Jerk", //FIXME: how to deal with "+", some exercises are combos, some are not on the standard list. Maybe he should be able to update the list/add remove items from the list
    ],
    cleanAndJerk: ["Clean + Jerk", "Clean + Front Squat + Jerk"],
    backSquat: [
      "Back Squat",
      "Pause Back Squat",
      "Good Morning",
      "Barbell Back Squat Jumps",
    ],
    frontSquat: ["Front Squat", "Pause Front Squat"],
    pushPress: ["Push Press"],
    RPEorRIR: [
      "Pushups",
      "Pullups",
      "Back Extension",
      "Situps",
      "Cable Row",
      "Bench Press",
      "Box Jumps",
      "Bent Over Barbell Row",
      "Pendlay Row",
      "Barbell Bicep Curl",
      "Dips",
      "Barbell Strict Press",
      "Lu Xiaojun Raise",
      "Bent Over Plate Rear Delt Flye",
      "Abs (your choice)",
      "Hanging Knee/Leg Raise",
      "Calf Raise",
      "1-Arm Dumbbell Row",
      "Bulgarian Split Squat",
      "Seated Barbell Press",
      "Seated Dumbbell Press",
    ],
  }

  function calculateRealWeight(exercise, scale) {
    if (scale.indexOf("%") > 0) {
      const rate = Math.round(parseInt(scale) / 100, 2)
      const matchedPb = Object.keys(pbsToExercises).filter((k) => {
        //probably need regex here
        const exerciseRegex = new RegExp(`${exercise}`, "gi")

        // 3 options, depending on the actual correspondences
        //console.log(pbsToExercises[k].join(" "))
        //or combine into one long string (depends)

        //FIXME: 3 position snatch doesn't match somehow
        return exerciseRegex.test(pbsToExercises[k].join(""))

        //can match by comparing against each string
        // return (
        //   pbsToExercises[k].filter((exercise) => {
        //     console.log(exercise, exerciseRegex, exerciseRegex.test(exercise))
        //     return exerciseRegex.test(exercise)
        //   }).length > 0
        // )

        //return pbsToExercises[k].includes(exercise)
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
            return `${rate * pbWeight}kg (${scale})`
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

  //global state...
  let scheduleData = ""

  //beforeComponentMount
  function setup() {
    fetchScheduleData(dataURL, successHandler, errorHandler)
  }

  //dynamic rendering based on data
  function makeExerciseRow(exerciseInfo) {
    const { exerciseName, options } = exerciseInfo
    let instruction
    if (options.length === 1) {
      instruction = options[0]
      const calculatedScale = calculateRealWeight(
        exerciseName,
        instruction.scale
      )
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

  function successHandler(data) {
    const { programme, name, schedule } = data
    scheduleData = schedule

    //initial render
    appendContent(makeHeader(programme, name))
    appendContent(makeDropDownOptions(Object.keys(schedule)))

    //similar to useEffect once/ afterwards it's handled by onChangeHandler
    if (scheduleData) {
      onSelectHandler()
    }
    $("#days").change(onSelectHandler)
  }

  function makeHeader(programme, name) {
    return `<h2>${programme} ${name}</h2>`
  }

  function errorHandler(xhr, err) {
    console.log(`${xhr.status} Error: ${err}`)
  }

  function updateTable(newTable) {
    if ($("table")) $("table").remove()
    appendContent(newTable)
  }

  function appendContent(html) {
    if (html) $(".schedule-table-container").append(html)
  }

  function makeDropDownOptions(options) {
    const htmlOptions = options.reduce((strAcc, opt) => {
      return strAcc + `<option value="${opt}">${opt}</option>`
    }, "")

    return `<label for='days'>Choose a day: </label><select name='days' id='days'>
    ${htmlOptions}
    </select>`
  }

  function onSelectHandler() {
    const pickedDate = $("#days").val()
    const content = makeScheduleTable(scheduleData[pickedDate])
    updateTable(content)
  }

  function makeTableHeader() {
    return `<tr><th>Exercise</th><th>Instruction</th></tr>`
  }

  function makeScheduleTable(exercises) {
    const tableHeader = makeTableHeader()
    const tableRows = makeExerciseRows(exercises)

    const tableHtml = `<table class='schedule-table'>${tableHeader}${tableRows}</table>`
    return tableHtml
  }

  function makeExerciseRows(exercises) {
    return exercises.reduce((strAcc, exercise) => {
      return strAcc + makeExerciseRow(exercise)
    }, "")
  }

  function fetchScheduleData(url, successHandler, errorHandler) {
    const config = {
      url: url,
      dataType: "json",
      success: function (data) {
        successHandler(data)
      },
      error: function (xhr, status, err) {
        errorHandler(xhr, err)
      },
    }

    $.ajax(config)
  }
  return {
    setup,
  }
})()

$(document).ready(schedule.setup)

//TODO: embed google feedback form, add add-edit-pbs functionality (probably save to local storage)
//TODO: make a form to make schedule
