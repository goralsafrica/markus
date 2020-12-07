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
import specializations from "../../../../seeders/specialists.json";
const opts = { abortEarly: false };

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
  adminFirstName: joi.string().required().trim(),
  adminLastName: joi.string().required().trim(),
  adminPhone: joi
    .string()
    .required()
    .regex(/^(\d{11})$/)
    .rule({ message: "phone number must be 11 digits" })
    .trim(),
  adminEmail: joi.string().email().required().trim(),
  hospitalName: joi.string().required().trim(),
  hospitalEmail: joi.string().email().required().trim(),
  hospitalPhone: joi
    .string()
    .required()
    .regex(/^(\d{11})$/)
    .rule({ message: "phone number must be 11 digits" })
    .trim(),
  title: joi
    .string()
    .required()
    .valid(...Object.keys(titles))
    .error(joiError(["title"], "invalid title"))
    .trim(),
  specialization: joi
    .string()
    .required()
    .valid(...Object.keys(specializations))
    .error(joiError(["specialization"], "invalid specialization"))
    .trim(),
  url: joi.string().required().trim(),
  password: joi.string().required().trim(),
  address: joi.string().required().trim(),
});
export async function registerHospitalValidator(req, res, next) {
  try {
    req.body = await registerHospitalSchema.validateAsync(req.body, opts);
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
  email: joi.string().required().email(),
  phone: joi
    .string()
    .regex(/^(\d{11})$/)
    .rule({ message: "phone number must be 11 digits" }),
  url: joi.string().required(),
  adddress: joi.string().required(),
});

export async function updateHospitalValidator(req, res, next) {
  try {
    req.body = await updateHospitalValidatorSchema.validateAsync(req.body, {
      abortEarly: false,
    });
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
