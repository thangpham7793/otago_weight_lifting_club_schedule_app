const { pbs, pbsToExercises } = require("./data")
const $ = require("jquery")

function calculateRealWeight(exercise, scale) {
  if (scale.indexOf("%") > 0) {
    const rate = Math.round(parseInt(scale) / 100, 2)
    const matchedPb = Object.keys(pbsToExercises).filter((k) => {
      //probably need regex here
      const exerciseRegex = new RegExp(`${exercise}`, "gi")
      //FIXME: 3 position snatch doesn't match somehow
      return exerciseRegex.test(pbsToExercises[k].join(""))
      //return pbsToExercises[k].includes(exercise)
    })[0]
    if (matchedPb) {
      console.log(matchedPb)
      let pbWeight
      try {
        pbWeight = pbs[matchedPb]
      } catch (error) {
        console.log(error)
      } finally {
        //if there's an available pbWeight
        if (pbWeight) {
          return `${rate * pbWeight}kg (${scale})`
        } else {
          //if not available, return the %
          return scale
        }
      }
    } else {
      return scale
    }
  } else {
    return scale
  }
}

function fetchData(url, successHandler, errorHandler) {
  if (!errorHandler) {
    function errorHandler(xhr, err) {
      console.log(`${xhr.status} Error: ${err}`)
    }
  }

  const config = {
    url: url,
    dataType: "json",
    success: function (data) {
      successHandler(data)
    },
    error: function (xhr, status, err) {
      errorHandler(xhr, err)
    },
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

module.exports = {
  calculateRealWeight,
  appendContent,
  fetchData,
  camelCaseToNormal,
}
