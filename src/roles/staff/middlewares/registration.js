//IMPORT MOODULES
import Hospital from "../../hospital/models/Hospital";
import Staff from "../models/Staff";
import validator from "validator";
import isEmpty from "is-empty";
import { badRequestError } from "../../../utilities";

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
  const data = req.body;

  data.email = !isEmpty(data.email) ? data.email : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.hospital = !isEmpty(data.hospital) ? data.hospital : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.email) || !validator.isEmail(data.email)) {
    errors.email = "invalid email";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "password is required";
  }

  if (validator.isEmpty(data.hospital)) {
    errors.password = "Invalid credentials";
  }

  if (!isEmpty(errors))
    return next(badRequestError(errors, "failed to create new staff"));

  console.log("data :", data);
  console.log("errors :", errors);
  //next();
}

export async function checkIfStaffExists(req, res, next) {}
