const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  let errors = {};

  if (isEmpty(data.name)) {
    errors.name = "Course name is required";
  }

  if (isEmpty(data.code)) {
    errors.code = "Course Code is required";
  }

  if (!errors.code && validator.isAlphanumeric(data.code)) {
    errors.code = "Invalid Course Code";
  }

  if (isEmpty(data.ch)) {
    errors.ch = "Credit hours field is required";
  }

  if (!errors.ch && !validator.isNumeric(data.ch)) {
    errors.ch = "Invalid Credit Hours Input";
  }

  if (isEmpty(data.teacher)) {
    errors.teacher = "Teacher field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
