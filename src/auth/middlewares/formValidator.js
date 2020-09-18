//IMPORT MOODULES
import Hospital from "../../roles/hospital/facility";
import validator from "validator";
import isEmpty from "is-empty";

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

  const hasEmpty = Object.values(data).some((prop) => isEmpty(prop));

  if (hasEmpty) {
    return next(400, errors, "bad request");
  }
  req.body = serializeInput(data);
  next();
}

function serializeInput(data) {
  for (const prop in data) {
    data[prop] = validator.escape(data[prop]);
  }
  return data;
}
