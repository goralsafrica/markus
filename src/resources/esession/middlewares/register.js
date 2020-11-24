import Joi from "joi";
Joi.objectId = require("joi-objectid")(Joi);
import { formatJoiError, joiError } from "../../../utilities";

const trim = () => Joi.string().trim();

const createSessionSchema = Joi.object().keys({
  firstName: trim().required(),
  lastName: Joi.string().required(),
  email: trim().email().required(),
  phone: Joi.string()
    .regex(/^(\d{11})$/)
    .rule({ message: "phone number must be 11 digits" }),
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

const createNewWorkspaceSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  address: Joi.string().required(),
  phone: Joi.string()
    .regex(/^(\d{10})$/)
    .rule({ message: "phone number must be 10 digits" }),
  url: Joi.string().required(),
});
export async function createNewWorkspaceValidator(req, res, next) {
  try {
    req.body = await createNewWorkspaceSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const errors = formatJoiError(err);
    return next({
      status: 400,
      errors,
      message: "failed to create new workspace",
    });
  }
}

export { createSessionValidator };
