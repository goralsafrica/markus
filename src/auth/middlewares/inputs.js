//IMPORT MOODULES
import validator from "validator";
import isEmpty from "is-empty";
import joi from "joi";
import { badRequestError, formatJoiError } from "../../utilities";
/**
 *
 * @param req
 * @param res
 * @param next
 *
 * @desc validates user inputs. sends errors and stops current endpoint work if any.
 */
export function loginValidator(req, res, next) {
  const errors = {};
  const data = {};
  data.email = req.body.email ? req.body.email : "";
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
  if (!isEmpty(errors)) return next(badRequestError(errors, "bad request"));
  //data.id = data.id.toUpperCase();

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
const forgotPasswordSchema = joi.object().keys({
  email: joi.string().email().required(),
});
export async function forgotPasswordValidator(req, res, next) {
  try {
    req.body = await forgotPasswordSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const errors = formatJoiError(err);
    next({ status: 400, errors, message: "authentication failed" });
  }
}
