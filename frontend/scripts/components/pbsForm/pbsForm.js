const utils = require("../../utils")
const { getPbs } = require("./pbsData")

const inputField = ({ name, value }) => {
  return `
  <label for='${name}'>${utils.camelCaseToNormal(name)}</label>
  <input type='text' id='${name}' name='${name}' value='${value}'>
  `
}

const pbsForm = () => {
  const pbsArr = getPbs()

  return `<form class="pbs-form">
  ${pbsArr.reduce((strAcc, pb) => strAcc + inputField(pb), "")}
  
  <button class="submit">Save</button>
  </form>`
}

module.exports = { pbsForm }

//TODO: think about where to put it
