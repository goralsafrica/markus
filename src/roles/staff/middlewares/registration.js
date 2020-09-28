//IMPORT MOODULES
import Hospital from "../../hospital/models/Hospital";
import Staff from "../models/Staff";
import validator from "validator";
import isEmpty from "is-empty";
import {
  badRequestError,
  generateStaffCode as generate,
} from "../../../utilities";
/**
 *
 * @param req
 * @param res
 * @param next
 *
 * @desc validates lmao inputs. sends errors and stops current endpoint work if any.
 */
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

  if (validator.isEmpty(data.lastName) || !validator.isAlpha(data.lastName)) {
    errors.lastName = "Invalid last name";
  }

  if (validator.isEmpty(data.phone) || !validator.isMobilePhone(data.phone)) {
    errors.phone = "Invalid phone number";
  }
  if (!isEmpty(errors))
    res.status(400).json({
      data: null,
      errors,
      message: "failed to create new user",
    });
  next();
}

export async function checkIfStaffExists(req, res, next) {
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

export async function generateStaffCode(req, res, next) {
  try {
    const staffs = await generate(Staff, req.credentials.hospital);
    console.log(staffs);
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
