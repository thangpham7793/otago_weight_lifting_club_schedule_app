function makeDropDownOptions(options) {
  const htmlOptions = options.reduce((strAcc, opt) => {
    return strAcc + `<option value="${opt}">${opt}</option>`
  }, "")

  return `<label for='days'>Choose a day: </label><select name='days' id='days'>
    ${htmlOptions}
    </select>`
}

module.exports = { makeDropDownOptions }
