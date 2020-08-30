const utils = require("../../utils")
const { getPbs } = require("./pbsData")

const inputField = ([key, value]) => {
  return `
  <div class='pbs-field'>
  <label for='${key}'>${utils.camelCaseToNormal(key)}</label>
  <input type='text' id='${key}' key='${key}' value='${value}'>
  </div>
  `
}

const pbsForm = () => {
  const pbsObj = getPbs()
  console.log(pbsObj)
  return `<form class="pbs-form">
  ${Object.entries(pbsObj).reduce(
    (strAcc, entry) => strAcc + inputField(entry),
    ""
  )}
  
  <button class="modal-submit-btn">Save</button>
  </form>`
}

module.exports = { pbsForm }
