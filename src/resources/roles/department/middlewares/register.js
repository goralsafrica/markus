import Joi from "joi";
Joi.objectId = require("joi-objectid")(Joi);
import Department from "../models/Department";
import { formatJoiError } from "../../../utilities";
const departmentSchema = Joi.array().items(Joi.objectId()).min(1);

export async function checkDepartment(req, res, next) {
  try {
    req.body.departments = await departmentSchema.validateAsync(
      req.body.departments,
      {
        abortEarly: false,
      }
    );
    next();
  } catch (err) {
    const errors = formatJoiError(err);
    next({
      status: 400,
      errors,
      message: "validation failed",
    });
  }
}
