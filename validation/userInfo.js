const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  let errors = {};

  if (isEmpty(data.password)) {
    errors.email = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
