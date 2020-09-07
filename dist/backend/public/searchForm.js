//https://stackoverflow.com/questions/40484355/browserify-multiple-files-into-a-single-bundle (does it work if each script works on different page?)

//may not have to do it at all

const searchForm = (function () {
  "use strict"

  const store = {}

  function makeLogo() {
    return ` <div class="logo-wrapper">
    <img
      class="logo"
      src="./assets/logo.jpg"
      alt="New Zealand Olympic Weight-Lifting Logo"
    />
  </div>`
  }

  function makeSubmitButton(customClassName, label) {
    return `<div class="submit-btn-container">
    <button type="submit" class="submit-btn ${customClassName}">${label}</button>
  </div>`
  }

  function makeProgrammeTitle(programmeName) {
    return `<div class="main__programme-title">
    <h2>${programmeName}<br /></h2>
    ${makeLogo()}
  </div>`
  }

  function makeDropdownOption(value) {
    return `<option value="${value}">${value}</option>`
  }

  function makeScheduleDropdown(schedules) {
    const scheduleOptions = schedules
      .map(({ schedule_name }) => {
        return makeDropdownOption(schedule_name)
      })
      .join("")

    return `<div class="field-container schedule">
    <label for="schedule" class="search-form-label index"
      >Schedule</label
    >
    <select name="schedule" id="schedule" required>
      ${scheduleOptions}
    </select>
  </div>`
  }

  function makeWeekDropdownMenu(weekCount) {
    let i = 1
    let options = ""
    while (i <= weekCount) {
      options += makeDropdownOption(i)
      i++
    }

    return `<div class="field-container week">
    <label for="week" class="search-form-label index">Week</label>
    <select name="week" id="week" required>
      ${options}
    </select>
  </div>`
  }

  function makeSearchForm(schedules) {
    return `
  <div class="search-form-wrapper">
    <form class='search-form'>
      ${makeScheduleDropdown(schedules)}
      ${makeWeekDropdownMenu(schedules[0].week_count)}
      ${makeSubmitButton("", "Let's Go")}
    </form>
  </div>`
  }

  function displaySearchForm({ schedules }) {
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
      const chosenSchedule = e.target.value
      const weekCount = schedules.filter(({ schedule_name }) => {
        return schedule_name === chosenSchedule
      })[0].week_count
      console.log(chosenSchedule, weekCount)
      renderWeekDropdown(weekCount)
    }

    const programmeName = schedules[0].programme_name

    //initial rendering
    const form = makeProgrammeTitle(programmeName) + makeSearchForm(schedules)
    document.querySelector(".main.index").innerHTML = form
    document.querySelector("#schedule").onchange = onScheduleChangeHander
  }

  function saveChosenWeek(week) {
    sessionStorage.setItem("week", week)
  }

  function submitWeekHandler(e) {
    e.preventDefault()
    const week = document.getElementById("week").value
    //TODO: need to use fetched data here as well
    //need to save the week + schedule_id
    saveChosenWeek(week)
    //another network call here ...
    location.href = "./timetable.html"
  }

  function loginSuccessHandler(schedules) {
    store.schedules = schedules
    displaySearchForm(store)
    const submitBtn = document.getElementsByClassName("submit-btn")[0]
    submitBtn.addEventListener("click", submitWeekHandler)
  }

  function makeErrorMessage(errorMessage) {
    return `<div class='error-message-wrapper'>
    <p class='error-message' style='visibility:hidden;'>${errorMessage}</p>
    </div>`
  }

  function makeTextInput(field) {
    return `<div class="field-container ${field}">
    <label for="${field}" class="search-form-label index ${field}">${field}</label>
    <input type="text" name="${field}" id="${field}">
    </div>`
  }

  function makeLoginForm() {
    return `<div class='search-form-wrapper'>
    <form class='login-form'>
      ${makeTextInput("email")}
      ${makeTextInput("password")}
      ${makeErrorMessage("some error")}
      ${makeSubmitButton("login", "Log In")}
      </form>
    </div>`
  }

  const tempCredentials = { email: "", password: "" }

  function isEmail(email) {
    const pattern = /^([\w_-]+|[\w_-]+(.[\w_-]+)+?)@([\w_-]+|[\w_-]+(.[\w_-]+)+?)$/
    return pattern.test(email)
  }

  function isEmpty(str) {
    return str.trim().length === 0
  }

  function areCredentialsValid({ email, password }) {
    if (isEmpty(email)) {
      return { errorMessage: "Missing Email!" }
    } else if (isEmpty(password)) {
      return { errorMessage: "Missing Password!" }
    } else if (!isEmail(email)) {
      return { errorMessage: "Invalid Email Format!" }
    }
    return { errorMessage: null }
  }

  function showErrorMessage(errorMessage) {
    document.querySelector(".error-message").innerHTML = errorMessage
    document.querySelector(".error-message").style.visibility = ""
  }

  //do controlled form here
  //need to add validation as well
  function onTextInputChangeHander(e) {
    tempCredentials[e.target.id] = e.target.value
    console.log(tempCredentials)
  }

  function displayLoginForm() {
    const loginForm = makeLogo() + makeLoginForm()
    document.querySelector(".main.index").innerHTML = loginForm
    document.querySelector("#email").onchange = onTextInputChangeHander
    document.querySelector("#password").onchange = onTextInputChangeHander
  }

  function loginBtnHandler(e) {
    e.preventDefault()
    //make ajax call here

    const { errorMessage } = areCredentialsValid(tempCredentials)

    if (!errorMessage) {
      console.log("Fetching Data")

      const url = `http://localhost:3000/learner/login`
      const fetchOptions = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempCredentials),
      }
      fetch(url, fetchOptions)
        .then((res) => {
          res
            .json()
            .then((schedules) => {
              console.log(schedules)
              loginSuccessHandler(schedules)
            })
            .catch((err) => console.log(`Error parsing JSON: ${err}`))
        })
        .catch((err) => console.log(`Error fetching data: ${err}`))
    } else {
      showErrorMessage(errorMessage)
    }
  }

  function setup() {
    displayLoginForm()
    document
      .querySelector(".submit-btn.login")
      .addEventListener("click", loginBtnHandler)
    //called after ajax results come back
  }

  return {
    setup,
  }
})()

if (window.addEventListener) {
  window.addEventListener("load", searchForm.setup)
} else if (window.attachEvent) {
  window.attachEvent("onload", searchForm.setup)
} else {
  alert("Could not attach 'searchForm.setup' to the 'window.onload' event")
}
