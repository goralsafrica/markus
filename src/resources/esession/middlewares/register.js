import Joi from "joi";
Joi.objectId = require("joi-objectid")(Joi);
import { formatJoiError } from "../../../utilities";
const createSessionSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  branch: Joi.objectId().required(),
  phone: Joi.number().integer(),
});

async function createSessionValidator(req, res, next) {
  try {
    const data = await createSessionSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    req.body = data;
    next();
  } catch (err) {
    next({
      status: 400,
      errors: formatJoiError(err),
      message: "failed to intialize session",
    });
  }
}

export { createSessionValidator };
