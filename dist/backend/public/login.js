const login = (function () {
  function setup() {
    console.log("Log me in!")
  }

  return {
    setup,
  }
})()

if (window.addEventListener) {
  window.addEventListener("load", login.setup)
} else if (window.attachEvent) {
  window.attachEvent("onload", login.setup)
} else {
  alert("Could not attach 'login.setup' to the 'window.onload' event")
}
