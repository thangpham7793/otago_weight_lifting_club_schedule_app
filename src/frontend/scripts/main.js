const $ = require("jquery")
const { savePbs, pbsForm } = require("./components/pbsForm/pbs")
const { fetchData } = require("./utils")
const { appendContent } = require("./utils")
const {
  makeExerciseHeader,
  makeDropDownOptions,
  makeScheduleTable,
} = require("./components/exerciseTable/exerciseTable")
const { getStore, saveStore } = require("./utils")
const config = require("./config")

//similar to App.js
const schedule = (function () {
  //global state like Redux or component state like React...

  const store = getStore()
  const { scheduleId, week } = JSON.parse(
    sessionStorage.getItem("weeklySchedule")
  )

  const dataURL = `${config.LOCAL_HOST}/schedules/${scheduleId}/weeks/${week}`

  function pbsSubmitHandler(e) {
    e.preventDefault()
    //save pbs to server
    savePbs(store)
    //close pbs modal
    toggleModal()
    //save store
    saveStore(store)
    //rerender table with new pbs
    //location.reload() moved to savePbs successHandler
  }

  //update temporary pbs data object
  function onPbsFormInputHandler() {
    const targetName = this.getAttribute("key")
    //update temp form data just like React's controlled form
    store.pbs[targetName] = parseFloat(this.value)
    //$("pre").text(JSON.stringify(formData, null, 2))
  }

  //only render the form and add props when clicked
  function toggleModal() {
    console.log("Show pbs!")
    $(".pbs-modal").toggle()
  }

  function toggleFeedbackModal() {
    $(".fb-modal").toggle()
  }

  //initial render
  function successHandler(dailySchedules) {
    spinner.show(false)
    console.log(dailySchedules)
    if (typeof dailySchedules === "string") {
      store.dailySchedules = JSON.parse(dailySchedules)
    }
    console.log(`The chosen week is week ${week}`)
    //appendContent(makeExerciseHeader(programme, name, week))
    appendContent(makeDropDownOptions(Object.keys(store.dailySchedules), week))

    //similar to useEffect once/ afterw+ards it's handled by onChangeHandler
    if (store.dailySchedules) {
      onSelectHandler()
    }
    $("#days").on({ change: onSelectHandler })

    //PBS MODAL
    $(".pbs-content").append(pbsForm(store.pbs))
    $(".pbs-form").on({ submit: pbsSubmitHandler })
    $(".pbs-form > div > input").on({ input: onPbsFormInputHandler })
    $(".pbs-btn").on({ click: toggleModal })
    $(".pbs-close").on({
      click: toggleModal,
    })

    //FB MODAL
    $(".fb-btn").on({ click: toggleFeedbackModal })
    $(".fb-close").on({
      click: toggleFeedbackModal,
    })

    window.onclick = function (e) {
      if (e.target.classList.contains("pbs-modal")) {
        toggleModal()
      } else if (e.target.classList.contains("fb-modal")) {
        toggleFeedbackModal()
      }
    }
  }

  function updateTable(newTable) {
    if (document.getElementsByTagName("table")[0])
      document.getElementsByTagName("table")[0].remove()
    appendContent(newTable)
  }

  function onSelectHandler() {
    const pickedDate = document.getElementById("days").value
    console.log(pickedDate)
    const content = makeScheduleTable(store.dailySchedules[pickedDate])
    updateTable(content)
  }

  window.onbeforeunload = function (e) {
    //update the chosen week
    store.chosenWeek = { scheduleId, week }
    saveStore(store)
  }

  //componentDidMount (on page load)
  function setup() {
    spinner.show(true)
    //if user has picked a week once
    if (store.chosenWeek) {
      const prevWeek = store.chosenWeek.week
      const prevScheduleId = store.chosenWeek.scheduleId
      //if user chooses the same week and same schedule, use stored data
      if (
        store.dailySchedules &&
        prevWeek === week &&
        prevScheduleId === scheduleId
      ) {
        console.log("No need to refetch daily schedules!")
        successHandler(store.dailySchedules)
      } else {
        fetchData(dataURL, store.token, successHandler)
      }
      //if the data hasn't been fetched or it's a new week/schedule
    } else {
      fetchData(dataURL, store.token, successHandler)
    }
  }

  return {
    setup,
  }
})()

$(schedule.setup)
