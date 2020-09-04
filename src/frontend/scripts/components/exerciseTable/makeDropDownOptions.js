function makeDropDownOptions(options, week) {
  const htmlOptions = options.reduce((strAcc, opt) => {
    return strAcc + `<option value="${opt}">${opt}</option>`
  }, "")

  return `<div class='search-form-wrapper timetable'>
  <label for="days" class='search-form-label timetable'>Week ${week}</label>
  <select name='days' id='days'>${htmlOptions}</select>
  </div>`
}

module.exports = { makeDropDownOptions }
