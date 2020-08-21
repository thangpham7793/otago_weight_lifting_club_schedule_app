const $ = require("jquery")
const { pbsForm } = require("./components/pbsForm/pbsForm")
const { pbs } = require("./data")
const { fetchData } = require("./utils")
const { appendContent } = require("./utils")
const {
  makeExerciseHeader,
  makeDropDownOptions,
  makeScheduleTable,
} = require("./components/exerciseTable/exerciseTable")

//similar to App.js
const schedule = (function () {
  const dataURL = "data/schedule.json"

  //global state like Redux or component state like React...
  let scheduleData = ""
  let formData = {}

  //initial render
  function successHandler(data) {
    const { programme, name, schedule } = data
    scheduleData = schedule

    appendContent(makeExerciseHeader(programme, name))
    appendContent(makeDropDownOptions(Object.keys(schedule)))

    //similar to useEffect once/ afterwards it's handled by onChangeHandler
    if (scheduleData) {
      onSelectHandler()
    }
    $("#days").on({ change: onSelectHandler })

    function pbsSubmitHandler(e) {
      e.preventDefault()
    }

    function onPbsFormInputHandler() {
      formData[this.getAttribute("id")] = this.value
      $("pre").text(JSON.stringify(formData, null, 2))
    }

    function pbsBtnClickHandler() {
      appendContent(pbsForm(pbs))
      $(".pbs-form").on({ submit: pbsSubmitHandler })
      $(".pbs-form > input").on({ input: onPbsFormInputHandler })
    }

    //testing
    $(".pbs").on({ click: pbsBtnClickHandler })
  }

  function updateTable(newTable) {
    if (document.getElementsByTagName("table")[0])
      document.getElementsByTagName("table")[0].remove()
    appendContent(newTable)
  }

  function onSelectHandler() {
    const pickedDate = document.getElementById("days").value
    const content = makeScheduleTable(scheduleData[pickedDate])
    updateTable(content)
  }

  //componentDidMount (on page load)
  function setup() {
    fetchData(dataURL, successHandler)
  }

  return {
    setup,
  }
})()

$(schedule.setup)

//TODO: embed google feedback form, add add-edit-pbs functionality (probably save to local storage)
//TODO: make a form to make schedule
