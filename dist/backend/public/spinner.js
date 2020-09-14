const spinner = (function () {
  function show(status) {
    if (status === true) {
      console.log("Show spinner now!")
      document.querySelector("#spinner").style.display = "block"
    } else {
      document.querySelector("#spinner").style.display = "none"
      console.log("Hide spinner")
    }
  }
  return { show }
})()
