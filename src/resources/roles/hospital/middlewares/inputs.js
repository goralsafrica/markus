import isEmpty from "is-empty";
import validator from "validator";
import joi from "joi";
import {
  sanitize,
  formatJoiError,
  validatePhoneNumber,
  joiError,
} from "../../../../utilities";
import titles from "../../../../seeders/titles.json";

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
    return res.send(badRequestError(errors, "failed to create new enviroment"));

  req.body = sanitize(validator, data);
  next();
}

const registerHospitalSchema = joi.object().keys({
  adminFirstName: joi.string().required(),
  adminLastName: joi.string().required(),
  adminPhone: joi.number().required(),
  adminEmail: joi.string().email().required(),
  hospitalName: joi.string().required(),
  hospitalEmail: joi.string().email().required(),
  hospitalPhone: joi.number().required(),
  title: joi
    .string()
    .required()
    .valid(...Object.keys(titles)),
  url: joi.string().required(),
  password: joi.string().required(),
  address: joi.string().required(),
});
export async function registerHospitalValidator(req, res, next) {
  try {
    req.body = await registerHospitalSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    req.body.adminPhone = validatePhoneNumber(req.body.adminPhone);
    if (!req.body.adminPhone)
      throw joiError(["adminPhone"], "invalid admin phone number");

    req.body.hospitalPhone = validatePhoneNumber(req.body.hospitalPhone);
    if (!req.body.hospitalPhone)
      throw joiError(["hospitalPhone"], "invalid hospital phone number");

    next();
  } catch (err) {
    const errors = formatJoiError(err);
    next({
      status: 400,
      errors,
      message: "failed to create new workspace",
    });
  }
}

const updateHospitalValidatorSchema = joi.object().keys({
  name: joi.string().required(),
  email: joi.string().email(),
  phone: joi.number().required(),
  url: joi.string().required(),
});

export async function updateHospitalValidator(req, res, next) {
  try {
    req.body = await updateHospitalValidatorSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    req.body.phone = validatePhoneNumber(req.body.adminPhone);
    if (!req.body.phone) throw joiError(["phone"], "invalid phone number");
    next();
  } catch (err) {
    const errors = formatJoiError(err);
    return next({
      status: 400,
      errors,
      message: "failed to update workspace details",
    });
  }
}
