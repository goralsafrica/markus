//IMPORT MOODULES
var mongoose = require("mongoose");
var validator = require("validator");
var isEmpty = require("is-empty");

/**
 *
 * @param req
 * @param res
 * @param next
 *
 * @desc validates user inputs. sends errors and stops current endpoint work if any.
 */

exports.registerValidator = function (req, res, next) {
  const errors = {};
  const data = req.body;

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.role = !isEmpty(data.role) ? data.role : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.departmentId = !isEmpty(data.departmentId) ? data.departmentId : "";

  // VALIDATION RULES
  if (validator.isEmpty(data.firstName) || !validator.isAlpha(data.lastName)) {
    errors.firstName = "First name is an alphabet only required field";
  }

  if (validator.isEmpty(data.lastName) || !validator.isAlpha(data.lastName)) {
    errors.lastName = "Last name is an alphabet only required field";
  }

  if (validator.isEmpty(data.email) || !validator.isEmail(data.email)) {
    errors.email = "Incorrect Email";
  }

  if (validator.isEmpty(data.role)) {
    errors.role = "role is required";
  } else {
    if (data.role !== "sub-admin" && data.role !== "user") {
      errors.role = "role can only have values: sub-admin and user";
    }
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "password is required";
  } else {
    if (!validator.isLength(data.password, { min: 8, max: 30 })) {
      errors.passwordLength = "Password must be at least 8 characters";
    }
  }

  if (validator.isEmpty(data.departmentId)) {
    errors.departmentId = "department ID is required";
  }

  if (!mongoose.Types.ObjectId.isValid(data.departmentId)) {
    console.log("here");
    errors.departmentId = "invalid department ID";
  }

  if (!isEmpty(errors)) return next({ status: 400, message: errors });
  next();
};

exports.loginValidator = function (req, res, next) {
  const errors = {};
  const data = req.body;

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.email) || !validator.isEmail(data.email)) {
    errors.email = "Incorrect Email";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "password is required";
  }

  if (!isEmpty(errors)) return res.status(400).json(errors);
  next();
};

exports.departmentValidator = function (req, res, next) {
  const errors = {};
  const data = req.body;

  console.log(data);
  data.name = !isEmpty(data.name) ? data.name : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "name of department is required";
  }

  if (!isEmpty(errors)) return res.status(400).json(errors);
  next();
};
