const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  let errors = {};

  if (isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (!errors.name && !validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "Name must be between 3 and 30 characters";
  }

  if (isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!errors.email && !validator.isEmail(data.email)) {
    errors.email = "Email is Invalid";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (
    !errors.password &&
    !validator.isLength(data.password, { min: 6, max: 20 })
  ) {
    errors.password = "Password must be between 6 and 20 characters";
  }

  if (isEmpty(data.password2)) {
    errors.password2 = "Confirm Password is required";
  }

  if (
    !errors.password &&
    !errors.password2 &&
    !validator.equals(data.password, data.password2)
  ) {
    errors.password2 = "Password Must Match!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
