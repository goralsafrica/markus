//IMPORT MOODULES
import validator from "validator";
import isEmpty from "is-empty";
import Joi from "joi";
import { formatJoiError, joiError } from "../../../../utilities";
import Staff from "../models/Staff";
import titles from "../../../../seeders/titles.json";

Joi.objectId = require("joi-objectid")(Joi);

export async function createStaffValidator(req, res, next) {
  const errors = {};
  const data = {};

  data.email = !isEmpty(req.body.email) ? req.body.email : "";
  data.phone = !isEmpty(req.body.phone) ? req.body.phone : "";
  data.firstName = !isEmpty(req.body.firstName) ? req.body.firstName : "";
  data.lastName = !isEmpty(req.body.lastName) ? req.body.lastName : "";
  data.email = !isEmpty(req.body.email) ? req.body.email : "";
  data.password = !isEmpty(req.body.password) ? req.body.password : "";

  if (validator.isEmpty(data.email) || !validator.isEmail(data.email)) {
    errors.email = "invalid email";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "password is required";
  }

  if (validator.isEmpty(data.firstName) || !validator.isAlpha(data.firstName)) {
    errors.firstName = "Invalid first name";
  }

  if (validator.isMongoId(String(req.body.role))) {
    data.role = req.body.role;
  } else {
    errors.role = "invalid role id";
  }

  if (validator.isMongoId(String(req.body.department))) {
    data.department = req.body.department;
  } else {
    errors.department = "invalid department id";
  }

  if (validator.isEmpty(data.lastName) || !validator.isAlpha(data.lastName)) {
    errors.lastName = "Invalid last name";
  }

  if (validator.isEmpty(data.phone) || !validator.isMobilePhone(data.phone)) {
    errors.phone = "Invalid phone number";
  }
  if (!isEmpty(errors))
    return res.status(400).json({
      data: null,
      errors,
      message: "failed to create new user",
    });
  return next();
}

export async function checkIfStaffExistsInHospital(req, res, next) {
  const { email, phone } = req.body;
  try {
    const exists = await Staff.exists({
      $or: [{ email }, { phone }],
      hospital: req.credentials.hospital,
    });
    if (exists)
      return res.status(400).json({
        data: null,
        errors: {
          request:
            "a staff with these credentials already exists in this hospital",
        },
        message: "failed to create new staff",
      });
    next();
  } catch (err) {
    return next({
      status: 400,
      errors: {
        request: "failed to process request",
      },
      message: "failed to create new staff",
    });
  }
}

export async function checkIfStaffExists(req, res, next) {
  const { adminEmail: email, adminPhone: phone } = req.body;
  try {
    const exists = await Staff.exists({
      $or: [{ email }, { phone }],
    });
    if (exists)
      return res.status(400).json({
        data: null,
        errors: {
          request: "Staff credentials already exists",
        },
        message: "failed to create new staff",
      });
    next();
  } catch (err) {
    console.log(err);
    return next({
      status: 400,
      errors: {
        request: "failed to process request",
      },
      message: "failed to create new staff",
    });
  }
}

const administrativeRoleSchema = Joi.object()
  .keys({
    name: Joi.objectId(),
    branch: Joi.objectId(),
    department: Joi.objectId(),
  })
  .with("department", "branch");

const updateStaffDetailsSchema = Joi.object().keys({
  department: Joi.objectId(),
  branches: Joi.array().items(Joi.objectId()),
  administrativeRole: administrativeRoleSchema,
});
export async function updateStaffDetailsValidator(req, res, next) {
  try {
    const data = await updateStaffSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    req.body = data;
    next();
  } catch (err) {
    const errors = formatJoiError(err);
    next({
      status: 400,
      errors,
      message: "failed to update staff details",
    });
  }
}

const updateStaffSchema = Joi.object().keys({
  firstName: Joi.string()
    .trim()
    .pattern(/^[A-Za-z]+$/)
    .rule({ message: "invalid first name" }),
  lastName: Joi.string()
    .trim()
    .pattern(/^[A-Za-z]+$/)
    .rule({ message: "invalid last name" }),
  title: Joi.string()
    .valid(...Object.keys(titles))
    .error(joiError(["title"], "invalid title")),
  specialization: Joi.string()
    .valid(...Object.keys(titles))
    .error(joiError(["title"], "invalid title")),
  deviceToken: Joi.string().trim(),
});

export async function updateStaffValidator(req, res, next) {
  try {
    req.body = await updateStaffSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const errors = formatJoiError(err);
    return next({ status: 400, errors, message: "validation failed" });
  }
}
