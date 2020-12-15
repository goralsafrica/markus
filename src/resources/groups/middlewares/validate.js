import joi from "joi";
joi.objectId = require("joi-objectid")(joi);
import { formatJoiError } from "../../../utilities";

const opts = { abortEarly: false };

const createGroupSchema = joi.object().keys({
  name: joi.string().required().trim(),
  description: joi.string().trim(),
});
export async function createGroupValidator(req, res, next) {
  try {
    req.body = await createGroupSchema.validateAsync(req.body, opts);
    next();
  } catch (err) {
    const errors = formatJoiError(err);
    return next({ status: 400, errors, message: "failed to create new group" });
  }
}

const updateGroupSchema = joi.object().keys({
  name: joi.string().required().trim(),
  description: joi.string().trim(),
  members: joi.array().items(joi.objectId()),
});
export async function updateGroupValidator(req, res, next) {
  try {
    req.body = await updateGroupSchema.validateAsync(req.body, opts);
    //  remove every case of double entry
    req.body.members ? (req.body.members = [...new Set(req.body.members)]) : "";
    next();
  } catch (err) {
    const errors = formatJoiError(err);
    return next({ status: 400, errors, message: "failed to create new group" });
  }
}
