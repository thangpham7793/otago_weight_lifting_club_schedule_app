const config = require("../../config")

const defaultPbs = {
  snatch: 0,
  clean: 0,
  jerk: 0,
  cleanAndJerk: 0,
  backSquat: 0,
  frontSquat: 0,
  pushPress: 0,
}

const savePbs = (pbsObject) => {
  localStorage.setItem("pbs_v2", JSON.stringify(pbsObject))
  const options = {
    method: "PUT",
    body: JSON.stringify(pbsObject),
  }
  fetch(`${config.LOCAL_HOST}/learners/1/pbs`, options)
    .then((res) => console.log("Saved Pbs to Server"))
    .catch((err) => console.error(`Error saving pbs to server: ${err}`))
}

const getPbs = () => {
  if (!localStorage.getItem("pbs_v2")) {
    console.log("No saved Data!")
    return defaultPbs
  } else {
    return JSON.parse(localStorage.getItem("pbs_v2"))
  }
}

module.exports = { savePbs, getPbs }
