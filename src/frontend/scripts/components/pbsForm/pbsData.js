const config = require("../../config")

const savePbs = ({ pbs, learnerId }) => {
  spinner.show(true)
  console.log("Saving", JSON.stringify(pbs))
  const options = {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pbs),
  }
  //FIXME: need to find a way to retrieve learnerId or remove Id from this route
  fetch(`${config.API_ENTRY}/learners/${learnerId}/pbs`, options)
    .then((res) => {
      console.log("Saved Pbs to Server")
    })
    .catch((err) => console.error(`Error saving pbs to server: ${err}`))
    .finally(() => {
      spinner.show(false)
    })
}

module.exports = { savePbs }
