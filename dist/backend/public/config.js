const config = (function () {
  "use strict"

  const PROD = "https://lifting-schedule-v2.herokuapp.com"
  const DEV = "http://localhost:3000"

  return { URL: location.href.split(".").includes("herokuapp") ? PROD : DEV }
})()
