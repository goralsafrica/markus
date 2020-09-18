//IMPORT MOODULES
import Hospital from "../hospital/models/Hospital";
import Staff from "../staff/models/Staff";
import validator from "validator";
import isEmpty from "is-empty";
import * as utils from "../utilities";

/**
 *
 * @param req
 * @param res
 * @param next
 *
 * @desc validates user inputs. sends errors and stops current endpoint work if any.
 */
export default function loginValidator(req, res, next) {
  const errors = {};
  const data = {};

  data.email = !isEmpty(req.body.email) ? req.body.email : "";
  data.hospital = !isEmpty(req.body.hospital) ? req.body.hospital : "";
  data.password = !isEmpty(req.body.password) ? req.body.password : "";

  Object.values(data).some(prop => isEmpty(prop)) 
  if (validator.isEmpty(data.email) || !validator.isEmail(data.email)) {
    errors.email = "Invalid login credentials";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Invaid login credentials";
  }

  if (validator.isEmpty(data.hospital)) {
    errors.password = "Invalid login credentials";
  }

  if (!isEmpty(errors))
    return res.status(400).json({
      data: null,
      errors: data,
      message: "bad request",
    });

  try {
    await Hospital.findById(data.hospital);
  } catch (err) {
    res.status(400).json({
      data: null,
      errors: ["hospital not found"],
      message: "bad request",
    });
  }

  req.body = serializeInput(data);
  next();
}

function serializeInput(data){
  for (const prop in data) {
    data[prop] = validator.escape(data[prop]);
  }
  return data
}
