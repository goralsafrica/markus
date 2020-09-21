import isEmpty from "is-empty";
import validator from "validator";
import { badRequestError, sanitize } from "../../../utilities";
import Hospital from "../models/Hospital";

export function registerValidator(req, res, next) {
  const errors = {};
  const data = {};

  data.hospitalName = !isEmpty(req.body.hospitalName)
    ? req.body.hospitalName
    : "";
  data.hospitalEmail = !isEmpty(req.body.hospitalEmail)
    ? req.body.hospitalEmail
    : "";
  data.hospitalPhone = !isEmpty(req.body.hospitalPhone)
    ? req.body.hospitalPhone
    : "";
  data.password = !isEmpty(req.body.password) ? req.body.password : "";
  data.adminFirstName = !isEmpty(req.body.adminFirstName)
    ? req.body.adminFirstName
    : "";
  data.adminLastName = !isEmpty(req.body.adminLastName)
    ? req.body.adminLastName
    : "";
  data.adminEmail = !isEmpty(req.body.adminEmail) ? req.body.adminEmail : "";
  data.adminPhone = !isEmpty(req.body.adminPhone) ? req.body.adminPhone : "";
  data.url = !isEmpty(req.body.url) ? req.body.url : "";
  // check for empty fields
  Object.values(data).some((val) => isEmpty(val))
    ? (errors.request = "All fields are required")
    : "";
  if (isEmpty(errors)) {
    // VALIDATION RULES
    [data.hospitalName, data.adminFirstName, data.adminLastName].some(
      (val) => !validator.isAlpha(validator.blacklist(val, [" ", "-"]))
    )
      ? errors.push("invalid name(s)")
      : "";
    [data.hospitalEmail, data.adminEmail].some((val) => !validator.isEmail(val))
      ? errors.push("invalid email(s)")
      : "";
    [data.adminPhone, data.hospitalPhone].some(
      (val) => !validator.isMobilePhone(val)
    )
      ? errors.push("invalid phone number(s)")
      : "";
  }
  if (!isEmpty(errors))
    res.send(badRequestError(errors, "failed to create new enviroment"));

  req.body = sanitize(validator, data);
  next();
}

export function registerBranchValidator(req, res, next) {
  const errors = [];
  const data = {};

  data.address = !isEmpty(req.body.address) ? req.body.address : "";
  data.city = !isEmpty(req.body.city) ? req.body.city : "";
  data.state = !isEmpty(req.body.state) ? req.body.state : "";
  data.country = !isEmpty(req.body.country) ? req.body.country : "";
  // check for empty fields
  Object.values(data).some((val) => isEmpty(val))
    ? errors.push("All fields are required")
    : "";
  if (!errors.length) {
    // VALIDATION RULES
    [data.country, data.city, data.state].some(
      (val) => !validator.isAlpha(validator.blacklist(val, [" ", "-"]))
    )
      ? errors.push("invalid name(s)")
      : "";
  }
  if (errors.length)
    return res.status(400).send({
      data: null,
      errors,
      message: "hospital branch creation failed",
    });
  req.body = sanitize(validator, data);
  next();
}
