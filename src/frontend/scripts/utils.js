const $ = require("jquery")

function fetchData(url, successHandler, errorHandler, spinner) {
  let config = {
    url: url,
    dataType: "json",
    success: function (data) {
      successHandler(data)
    },
  }

  if (!errorHandler) {
    config = {
      ...config,
      error: function (xhr, status, err) {
        console.log(`${xhr.status} Error: ${err}`)
        appendContent("<h2>Error Getting Weekly Schedule Data :(</h2>")
      },
    }
  } else {
    config = {
      ...config,
      error: function (xhr, status, err) {
        errorHandler(xhr, err)
      },
    }
  }

  $.ajax(config)
}

function appendContent(html) {
  if (html) $(".schedule-table-container").append(html)
}

function camelCaseToNormal(str) {
  return str.split("").reduce((newStr, char, index) => {
    if (index === 0) {
      return newStr + char.toUpperCase()
    } else if (char === char.toUpperCase()) {
      return newStr + " " + char
    } else {
      return newStr + char
    }
  }, "")
}

function isMatched(pattern, target) {
  //FIXME: 3 position snatch doesn't match somehow
  return new RegExp(pattern, "gi").test(target)
  //return pbsToExercises[k].includes(exercise)
}

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

module.exports = {
  appendContent,
  fetchData,
  camelCaseToNormal,
  isMatched,
  getStore,
  saveStore,
}
