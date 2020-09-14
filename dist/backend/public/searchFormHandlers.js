const searchFormHandlers = (function () {
  function displaySearchForm(schedules) {
    function renderWeekDropdown(weekCount) {
      const newWeekDropdown = makeWeekDropdownMenu(weekCount)
      //remove the stale drop down
      document
        .querySelector(".field-container.schedule")
        .nextElementSibling.remove()
      document
        .querySelector(".field-container.schedule")
        .insertAdjacentHTML("afterend", newWeekDropdown)
    }

    function onScheduleChangeHander(e) {
      //rerender the week dropdown menu here
      //hmm they probably make extensive use of id for this reason, since
      //it's unique and allow an element to be updated right away
      const chosenScheduleName = e.target.value
      const { weekCount, scheduleId } = schedules.filter(({ scheduleName }) => {
        return scheduleName === chosenScheduleName
      })[0]
      tempChosenWeeklySchedule.scheduleId = scheduleId
      console.log(
        `The chosen week'id is ${scheduleId}, ${weekCount} weeks long with the name ${chosenScheduleName}`
      )
      renderWeekDropdown(weekCount)
      document.querySelector("#week").onchange = onWeekSelectedHandler
    }

    const programmeName = schedules[0].programmeName
    //initial rendering
    const form = makeProgrammeTitle(programmeName) + makeSearchForm(schedules)
    document.querySelector(".main.index").innerHTML = form
    document.querySelector("#schedule").onchange = onScheduleChangeHander
    document.querySelector("#week").onchange = onWeekSelectedHandler
  }

  //save user's chosen week
  function onWeekSelectedHandler(e) {
    tempChosenWeeklySchedule.week = e.target.value
  }

  //so that it can be accessed to fetch data from server later
  function saveChosenWeeklySchedule(tempChosenWeeklySchedule) {
    sessionStorage.setItem(
      "weeklySchedule",
      JSON.stringify(tempChosenWeeklySchedule)
    )
  }

  function onSubmitWeekHandler(e) {
    e.preventDefault()
    //TODO: need to use fetched data here as well
    //need to save the week + schedule_id
    saveChosenWeeklySchedule(tempChosenWeeklySchedule)
    location.href = "./timetable.html"
  }

  function onLogOutHandler(e) {
    sessionStorage.clear()
    localStorage.clear()
  }

  function loginSuccessHandler({ schedules }) {
    displaySearchForm(schedules)
    const submitWeekBtn = document.querySelector(".submit-week")
    const logoutBtn = document.querySelector(".logout")
    submitWeekBtn.addEventListener("click", onSubmitWeekHandler)
    logoutBtn.addEventListener("click", onLogOutHandler)
  }

  function makeErrorMessage(errorMessage) {
    return `<div class='error-message-wrapper'>
            <p class='error-message' style='visibility:hidden;'>${errorMessage}</p>
            </div>`
  }

  function makeTextInput(field) {
    return `<div class="field-container ${field}">
            <label for="${field}" class="search-form-label index ${field}">${field}</label>
            <input type="${
              field === "password" ? "password" : "text"
            }" name="${field}" id="${field}">
            </div>`
  }

  function makeLoginForm() {
    return `<div class='search-form-wrapper form-wrapper search-form'>
            <form class='login-form'>
              ${makeTextInput("email")}
              ${makeTextInput("password")}
              ${makeErrorMessage("some error")}
              <div class="submit-btn-container">
                ${makeButton("to-signup left", "Sign Up")}
                ${makeButton("login right", "Log In")}
              </div>
              </form>
            </div>`
  }

  const tempCredentials = { email: "", password: "" }

  //do controlled form here
  //need to add validation as well
  function onTextInputChangeHander(e) {
    tempCredentials[e.target.id] = e.target.value
    console.log(tempCredentials)
  }

  function onSignupHandler(e) {
    e.preventDefault()
    location.href = "./signup.html"
  }

  function onFailedLoginHandler({ message }) {
    console.log(message)
    showErrorMessage(message)
  }

  function showSpiner(status) {
    if (status === true) {
      console.log("Show spinner now!")
    } else {
      console.log("Hide spinner")
    }
  }

  function onLoginHandler(e) {
    e.preventDefault()
    //make ajax call here

    const { errorMessage } = areCredentialsValid(tempCredentials)

    if (errorMessage) {
      showErrorMessage(errorMessage)
      return
    }

    console.log("Logging in and Fetching Data")

    showSpiner(true)

    const url = `http://localhost:3000/learners/login`
    const fetchOptions = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempCredentials),
    }

    fetch(url, fetchOptions)
      .then((res) => {
        showSpiner(false)
        if (res.ok === false) {
          res
            .json()
            .then((payload) => {
              onFailedLoginHandler(payload)
            })
            .catch((err) => console.log(`Error parsing JSON: ${err}`))
          return
        }
        res
          .json()
          .then((payload) => {
            console.log(payload)
            //FIXME: site will get stuck if it receives an error object as payload. Need to check status code.
            saveStore(payload)
            loginSuccessHandler(payload)
          })
          .catch((err) => console.log(`Error parsing JSON: ${err}`))
      })
      .catch((err) => console.log(`Error fetching data: ${err}`))
  }

  return {}
})()
