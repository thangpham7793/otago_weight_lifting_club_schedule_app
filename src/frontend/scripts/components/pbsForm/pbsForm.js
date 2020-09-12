const { camelCaseToNormal } = require("../../utils")

const inputField = ([key, value]) => {
  return `
  <div class='pbs-field'>
  <label for='${key}'>${camelCaseToNormal(key)}</label>
  <input type='text' id='${key}' key='${key}' value='${value}'>
  </div>
  `
}

const pbsForm = (pbs) => {
  //const pbsObj = getPbs()
  console.log(pbs)
  return `<form class="pbs-form">
  ${Object.entries(pbs).reduce(
    (strAcc, entry) => strAcc + inputField(entry),
    ""
  )}
  
  <button class="modal-submit-btn">Save</button>
  </form>`
}

module.exports = { pbsForm }
