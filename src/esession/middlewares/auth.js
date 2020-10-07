import Joi from "joi";
import { formatJoiError } from "../../utilities";

const verifyStaffSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
export async function verifyStaffValdator(req, res, next) {
  try {
    const data = await verifyStaffSchema.validateAsync(req.query, {
      abortEarly: false,
    });
    console.log(data);
    next();
  } catch (err) {
    const errors = formatJoiError(err);
    return next({
      status: 400,
      errors,
      message: "failed to validate staff",
    });
  }
}
