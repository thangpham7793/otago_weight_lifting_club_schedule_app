//https://stackoverflow.com/questions/40484355/browserify-multiple-files-into-a-single-bundle (does it work if each script works on different page?)

//may not have to do it at all

const searchForm = (function () {
  "use strict"

  function saveChosenWeek(week) {
    sessionStorage.setItem("week", week)
  }

  function submitHandler(e) {
    e.preventDefault()
    const week = document.getElementById("week").value
    saveChosenWeek(week)
    location.href = "./timetable.html"
  }

  function setup() {
    const submitBtn = document.getElementsByClassName("submit-btn")[0]
    submitBtn.addEventListener("click", submitHandler)
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
