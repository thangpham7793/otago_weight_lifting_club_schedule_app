const defaultPbsArr = [
  {
    name: "snatch",
    value: 0,
  },
  {
    name: "clean",
    value: 0,
  },
  {
    name: "jerk",
    value: 0,
  },
  {
    name: "cleanAndJerk",
    value: 0,
  },
  {
    name: "backSquat",
    value: 0,
  },
  {
    name: "frontSquat",
    value: 0,
  },
  {
    name: "pushPress",
    value: 0,
  },
]

const savePbs = (pbsObject) => {
  localStorage.setItem("pbs", JSON.stringify(pbsObject))
}

const getPbs = () => {
  if (!localStorage.getItem("pbs")) {
    return defaultPbsArr
  } else {
    return JSON.parse(localStorage.getItem("pbs"))
  }
}

module.exports = { savePbs, getPbs }
