const utils = require("../../utils")
const { pbs } = require("../../data")

const inputField = (pb) => {
  return `
  <label for='${pb}'>${utils.camelCaseToNormal(pb)}</label>
  <input type='text' id='${pb}' name='${pb}'>
  `
}

const pbsForm = (pbsArr) => {
  let fieldsArr

  if (!pbsArr) {
    fieldsArr = Object.keys(pbs)
  } else {
    fieldsArr = Object.keys(pbsArr)
  }

  return `<form class="pbs-form" style="display:none">
  ${fieldsArr.reduce((strAcc, pb) => strAcc + inputField(pb), "")}
  
  <button class="submit">Save</button>
  </form>`
}

module.exports = { pbsForm }

//TODO: think about where to put it
