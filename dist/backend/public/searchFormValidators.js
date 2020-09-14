const searchFormValidators = (function () {
  function isEmail(email) {
    const pattern = /^([\w_-]+|[\w_-]+(.[\w_-]+)+?)@([\w_-]+|[\w_-]+(.[\w_-]+)+?)$/
    return pattern.test(email)
  }

  function isEmpty(str) {
    return str.trim().length === 0
  }

  function areCredentialsValid({ email, password }) {
    if (isEmpty(email)) {
      return { errorMessage: "Missing Email!" }
    } else if (isEmpty(password)) {
      return { errorMessage: "Missing Password!" }
    } else if (!isEmail(email)) {
      return { errorMessage: "Invalid Email Format!" }
    }
    return { errorMessage: null }
  }

  return {}
})()
