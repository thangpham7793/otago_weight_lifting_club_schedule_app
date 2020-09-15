const config = require("../../config")

const savePbs = ({ pbs, token }) => {
  spinner.show(true)
  console.log("Saving", JSON.stringify(pbs))
  const options = {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(pbs),
  }
  //FIXME: need to find a way to retrieve learnerId or remove Id from this route
  fetch(`${config.LOCAL_HOST}/learners/pbs`, options)
    .then((res) => {
      console.log("Saved Pbs to Server")
      //reload page to recalculate pbs based on the updated info
      location.reload()
    })
    .catch((err) => console.error(`Error saving pbs to server: ${err}`))
    .finally(() => {
      spinner.show(false)
    })
}

module.exports = { savePbs }
