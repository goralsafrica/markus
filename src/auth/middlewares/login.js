//IMPORT MOODULES
import validator from "validator";
import isEmpty from "is-empty";
import { badRequestError } from "../../utilities";
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
  data.id = req.body.id ? req.body.id : "";
  data.hospital = req.body.hospital ? req.body.hospital : "";
  data.password = req.body.password ? req.body.password : "";
  const hasEmpty = Object.values(data).some((prop) => isEmpty(prop));
  if (hasEmpty) {
    errors.request = "all fields are required";
    return next({
      status: 400,
      errors,
      message: "login failure",
    });
  }
  if (!validator.isMongoId(data.hospital)) {
    errors.hospital = "invalid hospital id";
  }

  if (!isEmpty(data)) return next(badRequestError(errors, "bad request"));
  data.id = data.id.toUpperCase();
  req.body = serializeInput(data);
  next();
}
function serializeInput(data) {
  for (const prop in data) {
    data[prop] = validator.trim(data[prop]);
    data[prop] = validator.escape(data[prop]);
  }
  return data;
}
