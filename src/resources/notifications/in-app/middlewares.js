import joi, { number, string } from "joi";
import { formatJoiError } from "../../../utilities";

const searchQuerySchema = joi.object().keys({
  page: joi.number().default(1),
  type: joi.string().valid("all", "workspace", "personal").default("workspace"),
});

export async function validateNotificationQuery(req, res, next) {
  try {
    req.query = await searchQuerySchema.validateAsync(req.query, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const errors = formatJoiError(err);
    return next({
      status: 400,
      errors,
      message: "failed to fetch notifications",
    });
  }
}
