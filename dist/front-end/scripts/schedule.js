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
    //pb1: 67,
    pb2: 186,
    pb3: 230,
  }
  //probably need a conversion dictionary
  //will there be exercises that can appear in any scale?
  const pbsToExercises = {
    pb1: [
      "3 position snatch (High Hang, Below Knee, Floor)",
      "power clean + split jerk",
    ],
    pb2: ["back squat"],
    pb3: ["clean pull"],
  }

  function calculateRealWeight(exercise, scale) {
    if (scale.indexOf("%") > 0) {
      const rate = parseInt(scale) / 100
      const matchedPb = Object.keys(pbsToExercises).filter((k) => {
        //probably need regex here
        const exerciseRegex = new RegExp(`${exercise}`, "gi")

        // 3 options, depending on the actual correspondences

        //or combine into one long string (depends)
        return exerciseRegex.test(pbsToExercises[k].join())

        //can match by comparing against each string
        // return (
        //   pbsToExercises[k].filter((exercise) => {
        //     return exerciseRegex.test(exercise)
        //   }).length > 0
        // )

        //return pbsToExercises[k].includes(exercise)
      })[0]
      if (matchedPb) {
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
//TODO: can also hook it up to Google Sheet to pull the data vs making a form off the app/ But that also means wrangling with the google sheet data...
