const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!errors.email && !validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
