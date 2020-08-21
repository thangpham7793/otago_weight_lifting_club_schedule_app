const $ = require("jquery")
const { getPbs, savePbs, pbsForm } = require("./components/pbsForm/pbs")
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
  let formData = getPbs()

  //initial render
  function successHandler(data) {
    const { programme, name, schedule } = data
    scheduleData = schedule

    //temp storage for input data

    appendContent(makeExerciseHeader(programme, name))
    appendContent(makeDropDownOptions(Object.keys(schedule)))

    //similar to useEffect once/ afterwards it's handled by onChangeHandler
    if (scheduleData) {
      onSelectHandler()
    }
    $("#days").on({ change: onSelectHandler })

    function pbsSubmitHandler(e) {
      savePbs(formData)
      $(".pbs-form").toggle()
      //e.preventDefault() (no need to do sth complicated, simply reload...rerender) => okay that's why they use virtual DOM
    }

    //update temporary pbs data object
    function onPbsFormInputHandler() {
      const targetName = this.getAttribute("name")
      formData.filter((pb) => pb.name === targetName)[0].value = this.value
      $("pre").text(JSON.stringify(formData, null, 2))
    }

    //only render the form and add props when clicked
    function pbsBtnClickHandler() {
      if ($(".pbs-form").length === 0) {
        appendContent(pbsForm())
        $(".pbs-form").on({ submit: pbsSubmitHandler })
        $(".pbs-form > input").on({ input: onPbsFormInputHandler })
      } else {
        $(".pbs-form").toggle()
      }
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
