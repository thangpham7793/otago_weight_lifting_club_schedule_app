//https://stackoverflow.com/questions/40484355/browserify-multiple-files-into-a-single-bundle (does it work if each script works on different page?)

const signup = (function () {
  "use strict"

  function makeLogo() {
    return ` <div class="logo-wrapper signup">
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

  function makeDropdownOption(value, id) {
    return `<option value="${value}" data-${id}=${id}>${value}</option>`
  }

  function makeTextInput(field) {
    return `<div class="field-container ${field} signup">
      <label for="${field}" class="search-form-label signup ${field}">${field}</label>
      <input type="${
        field === "password" ? "password" : "text"
      }" name="${field}" id="${field}" class="signup-input">
      </div>`
  }

  function makeErrorMessage(errorMessage) {
    return `<div class='error-message-wrapper'>
      <p class='error-message signup' style='visibility:hidden;'>${errorMessage}</p>
      </div>`
  }

  function makeProgrammeDropDownMenu(programmes) {
    console.log("Here are the programmes", programmes)
    const options = programmes.reduce(
      (htmlStr, { programmeName, programmeId }) => {
        return htmlStr + makeDropdownOption(programmeName, programmeId)
      },
      ""
    )

    return `<div class="field-container programmeName signup">
          <label for="programmeName" class="search-form-label signup">Programme</label>
          <select name="programmeName" id="programmeName" class="signup-input" required>
            ${options}
          </select>
        </div>`
  }

  //separate page is wise, this is too much to be in one file
  function makeSignUpForm(programmes) {
    return `<div class='search-form-wrapper form-wrapper'>
      <form class='login-form signup-form'>
        ${makeTextInput("firstName")}
        ${makeTextInput("lastName")}
        ${makeTextInput("email")}
        ${makeProgrammeDropDownMenu(programmes)}
        ${makeErrorMessage("some error")}
        <div class="submit-btn-container signup">
        ${makeButton("back-to-home left", "Home Page")}
        ${makeButton("signup-btn signup right", "Sign Up")}
        </div>
        </form>
      </div>`
  }

  function getProgrammes() {
    if (!sessionStorage.getItem("programmes")) {
      return null
    } else {
      return JSON.parse(sessionStorage.getItem("programmes"))
    }
  }

  let programmeName = getProgrammes() ? getProgrammes()[0].programmeName : ""

  let tempSignUpInfo = {
    firstName: "",
    lastName: "",
    email: "",
    programmeName,
  }

  function isEmail(email) {
    const pattern = /^([\w_-]+|[\w_-]+(.[\w_-]+)+?)@([\w_-]+|[\w_-]+(.[\w_-]+)+?)$/
    return pattern.test(email.trim())
  }

  function onlyAlphanumeric(str) {
    const pattern = /[a-zA-Z]+/gi
    return pattern.test(str.trim())
  }

  function areCredentialsValid({ firstName, lastName, email }) {
    if (!onlyAlphanumeric(firstName)) {
      return {
        errorMessage:
          "First Name can't be empty and should only contain letters!",
      }
    } else if (!onlyAlphanumeric(lastName)) {
      return {
        errorMessage:
          "Last Name can't be empty and should only contain letters!",
      }
    } else if (!isEmail(email)) {
      return { errorMessage: "Email can't be empty or have an invalid format!" }
    }
    return { errorMessage: null }
  }

  function showErrorMessage(errorMessage) {
    document.querySelector(".error-message").innerHTML = errorMessage
    document.querySelector(".error-message").style.visibility = ""
  }

  function onBackToLoginHandler(e) {
    e.preventDefault()
    location.href = "./index.html"
  }

  function onTextInputChangeHander(e) {
    tempSignUpInfo[e.target.id] = e.target.value
    console.log(tempSignUpInfo)
  }

  function displaySignUpForm(programmes) {
    //passing data down to functional components
    const signUpForm = makeLogo() + makeSignUpForm(programmes)
    //keep track of user's input data
    document.querySelector(".main.index").innerHTML = signUpForm
    document.querySelector("#firstName").onchange = onTextInputChangeHander
    document.querySelector("#lastName").onchange = onTextInputChangeHander
    document.querySelector("#email").onchange = onTextInputChangeHander
    document.querySelector("#programmeName").onchange = onTextInputChangeHander
    document.querySelector(".signup-btn").onclick = onSignUpHandler
    document.querySelector(".back-to-home").onclick = onBackToLoginHandler
  }

  function processSignUpInfo(tempSignUpInfo) {
    const programmeId = getProgrammes().filter(({ programmeName }) => {
      return programmeName === tempSignUpInfo.programmeName
    })[0].programmeId

    Object.keys(tempSignUpInfo).forEach(
      (k) => (tempSignUpInfo[k] = tempSignUpInfo[k].trim())
    )

    const cleanedInfo = { ...tempSignUpInfo, programmeId }

    delete cleanedInfo.programmeName

    console.log("Sending to server", cleanedInfo)
    return cleanedInfo
  }

  function onSignUpHandler(e) {
    e.preventDefault()
    //make ajax call here

    const { errorMessage } = areCredentialsValid(tempSignUpInfo)

    if (!errorMessage) {
      const url = `http://localhost:3000/learners/signup`
      const fetchOptions = {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(processSignUpInfo(tempSignUpInfo)),
      }
      fetch(url, fetchOptions)
        .then((res) => (location.href = "index.html"))
        .catch((err) => {
          console.log(`Error Signing Up: ${err}`)
          location.reload()
        })
    } else {
      showErrorMessage(errorMessage)
    }
  }

  function fetchProgrammes() {
    const url = `http://localhost:3000/programmes`
    const fetchOptions = {
      method: "GET",
      mode: "cors",
    }

    fetch(url, fetchOptions)
      .then((res) => {
        res
          .json()
          .then((programmes) => {
            console.log(programmes)

            sessionStorage.setItem("programmes", JSON.stringify(programmes))

            displaySignUpForm(programmes)
          })
          .catch((err) => console.log(`Error parsing JSON: ${err}`))
      })
      .catch((err) => console.log(`Error fetching data: ${err}`))
  }

  function setup() {
    //called after ajax results come back
    if (!getProgrammes()) {
      fetchProgrammes()
    } else {
      console.log("Reuse fetched programmes")
      displaySignUpForm(getProgrammes())
    }
  }

  return {
    setup,
  }
})()

if (window.addEventListener) {
  window.addEventListener("load", signup.setup)
} else if (window.attachEvent) {
  window.attachEvent("onload", signup.setup)
} else {
  alert("Could not attach 'signup.setup' to the 'window.onload' event")
}
