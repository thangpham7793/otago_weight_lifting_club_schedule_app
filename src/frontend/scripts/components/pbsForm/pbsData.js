const config = require("../../config")

const savePbs = (pbs) => {
  console.log("Saving", JSON.stringify(pbs))
  //localStorage.setItem("pbs_v2", JSON.stringify(pbs))
  const options = {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pbs),
  }
  fetch(`${config.LOCAL_HOST}/learners/1/pbs`, options)
    .then((res) => console.log("Saved Pbs to Server"))
    .catch((err) => console.error(`Error saving pbs to server: ${err}`))
}

module.exports = { savePbs }
