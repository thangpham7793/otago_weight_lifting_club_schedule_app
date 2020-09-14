const components = (function () {
  function makeLogo() {
    return ` <div class="logo-wrapper">
        <img
          class="logo"
          src="./assets/logo.jpg"
          alt="New Zealand Olympic Weight-Lifting Logo"
        />
      </div>`
  }

  function makeButton(customClassName, label) {
    return `<button type="submit" class="submit-btn ${customClassName}">${label}</button>`
  }

  function makeProgrammeTitle(programmeName) {
    return `<div class="main__programme-title">
        <h2>${programmeName}<br /></h2>
        ${makeLogo()}
      </div>`
  }

  function makeDropdownOption(value, id) {
    return `<option value="${value}" data-scheduledId=${id}>${value}</option>`
  }

  function makeScheduleDropdown(schedules) {
    const scheduleOptions = schedules
      .map(({ scheduleName, scheduleId }) => {
        return makeDropdownOption(scheduleName, scheduleId)
      })
      .join("")
    //default is the first schedule in the array
    tempChosenWeeklySchedule.scheduleId = schedules[0].scheduleId
    return `<div class="field-container schedule">
        <label for="schedule" class="search-form-label index"
          >Schedule</label
        >
        <select name="schedule" id="schedule" required>
          ${scheduleOptions}
        </select>
      </div>`
  }

  function makeWeekDropdownMenu(weekCount) {
    let i = 1
    let options = ""
    while (i <= weekCount) {
      options += makeDropdownOption(i)
      i++
    }

    return `<div class="field-container week">
        <label for="week" class="search-form-label index">Week</label>
        <select name="week" id="week" required>
          ${options}
        </select>
      </div>`
  }

  function makeSearchForm(schedules) {
    return `
      <div class="search-form-wrapper">
        <form class='search-form'>
          ${makeScheduleDropdown(schedules)}
          ${makeWeekDropdownMenu(schedules[0].weekCount)}
          <div class="submit-btn-container">
            ${makeButton("logout left", "Log Out")}
            ${makeButton("submit-week right", "Let's Go")}
          </div>
        </form>
      </div>`
  }

  return {}
})()

// if (window.addEventListener) {
//   window.addEventListener("load", components)
// } else if (window.attachEvent) {
//   window.attachEvent("onload", components)
// } else {
//   alert("Could not attach 'components' to the 'window.onload' event")
// }
