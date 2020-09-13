//https://stackoverflow.com/questions/40484355/browserify-multiple-files-into-a-single-bundle (does it work if each script works on different page?)

const searchForm = (function () {
  "use strict"

  function getStore() {
    if (sessionStorage.getItem("payload")) {
      return JSON.parse(sessionStorage.getItem("payload"))
    } else {
      return null
    }
  }

  function saveStore(payload) {
    sessionStorage.setItem("payload", JSON.stringify(payload))
  }

  const store = getStore()

  const tempChosenWeeklySchedule = {
    scheduleId: "",
    //initial value is always 1
    week: 1,
  }

  function makeLogo() {
    return ` <div class="logo-wrapper">
    <img
      class="logo"
      src="./assets/logo.jpg"
      alt="New Zealand Olympic Weight-Lifting Logo"
    />
  </div>`
  }

  function makeButton(customClassName, label) {
    return `<button type="submit" class="submit-btn ${customClassName}">${label}</button>`
  }

  function makeProgrammeTitle(programmeName) {
    return `<div class="main__programme-title">
    <h2>${programmeName}<br /></h2>
    ${makeLogo()}
  </div>`
  }

  function makeDropdownOption(value, id) {
    return `<option value="${value}" data-scheduledId=${id}>${value}</option>`
  }

  function makeScheduleDropdown(schedules) {
    const scheduleOptions = schedules
      .map(({ scheduleName, scheduleId }) => {
        return makeDropdownOption(scheduleName, scheduleId)
      })
      .join("")
    //default is the first schedule in the array
    tempChosenWeeklySchedule.scheduleId = schedules[0].scheduleId
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
      ${makeWeekDropdownMenu(schedules[0].weekCount)}
      <div class="submit-btn-container">
        ${makeButton("logout left", "Log Out")}
        ${makeButton("submit-week right", "Let's Go")}
      </div>
    </form>
  </div>`
  }

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

  function onSignupHandler(e) {
    e.preventDefault()
    location.href = "./signup.html"
  }

  function onLoginHandler(e) {
    e.preventDefault()
    //make ajax call here

    const { errorMessage } = areCredentialsValid(tempCredentials)

    if (!errorMessage) {
      console.log("Fetching Data")

      const url = `http://localhost:3000/learners/login`
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
            .then((payload) => {
              console.log(payload)
              //FIXME: site will get stuck if it receives an error object as payload. Need to check status code.
              saveStore(payload)
              loginSuccessHandler(payload)
            })
            .catch((err) => console.log(`Error parsing JSON: ${err}`))
        })
        .catch((err) => console.log(`Error fetching data: ${err}`))
    } else {
      showErrorMessage(errorMessage)
    }
  }

  function setup() {
    // display login form if user hasn't logged in and there's no payload saved in sessionStorage
    console.log(store)
    if (!store) {
      console.log("No saved info, please log in!")
      displayLoginForm()
      document
        .querySelector(".submit-btn.login")
        .addEventListener("click", onLoginHandler)
      document
        .querySelector(".submit-btn.to-signup")
        .addEventListener("click", onSignupHandler)
    } else {
      console.log("User already logged in!")
      loginSuccessHandler(store)
    }
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
