const { makeTableHeader } = require("./makeTableHeader")
const { makeExerciseRows } = require("./makeExerciseRows")

function makeScheduleTable(exercises) {
  const tableHeader = makeTableHeader()
  const tableRows = makeExerciseRows(exercises)

  const tableHtml = `<table class='schedule-table'>${tableHeader}${tableRows}</table>`
  return tableHtml
}

module.exports = { makeScheduleTable }
