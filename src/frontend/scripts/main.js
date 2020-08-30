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
  const dataURL = "database/september.json"

  //global state like Redux or component state like React...
  let scheduleData = ""
  //temp storage for input data
  let formData = getPbs()

  function pbsSubmitHandler(e) {
    savePbs(formData)
    toggleModal()
    //e.preventDefault()
    //(no need to do sth complicated, simply reload...rerender) => okay that's why they use virtual DOM
  }

  //update temporary pbs data object
  function onPbsFormInputHandler() {
    const targetName = this.getAttribute("key")
    //update temp form data just like React's controlled form
    formData[targetName] = this.value
    $("pre").text(JSON.stringify(formData, null, 2))
  }

  //only render the form and add props when clicked
  function toggleModal() {
    $(".pbs-modal").toggle()
  }

  //initial render
  function successHandler(data) {
    console.log(data)
    const { programme, name, schedule } = data
    const week = sessionStorage.getItem("week")
    console.log(`The chosen week is week ${week}`)
    scheduleData = schedule[`week ${week}`]
    console.log(scheduleData)
    appendContent(makeExerciseHeader(programme, name, week))
    appendContent(makeDropDownOptions(Object.keys(scheduleData)))
    //need to allow users to pick a week here (or maybe it should be a form right from the beginning)

    //similar to useEffect once/ afterwards it's handled by onChangeHandler
    if (scheduleData) {
      onSelectHandler()
    }
    $("#days").on({ change: onSelectHandler })

    //MODAL
    $(".modal-content").append(pbsForm())
    $(".pbs-form").on({ submit: pbsSubmitHandler })
    $(".pbs-form > div > input").on({ input: onPbsFormInputHandler })
    $(".pbs-btn").on({ click: toggleModal })
    $(".close").on({
      click: toggleModal,
    })
    window.onclick = function (e) {
      if (e.target.classList.contains("pbs-modal")) toggleModal()
    }
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
