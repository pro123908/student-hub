const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = data => {
  let errors = {};

  if (isEmpty(data.handle)) {
    errors.handle = "Profile Handle is required";
  }

  if (!errors.handle && !validator.isLength(data.handle, { min: 4, max: 10 })) {
    errors.handle = "Profile Handle must be between 4 and 10 characters";
  }

  if (isEmpty(data.university)) {
    errors.university = "University Field is required";
  }

  if (isEmpty(data.department)) {
    errors.department = "Department Field is required";
  }

  if (isEmpty(data.year)) {
    errors.year = "Year Field is required";
  }

  if (isEmpty(data.semester)) {
    errors.semester = "Semester Field is required";
  }

  if (isEmpty(data.phone)) {
    errors.phone = "Phone Field is required";
  }

  if (!errors.phone && !validator.isNumeric(data.phone)) {
    errors.phone = "Invalid Phone Number";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
