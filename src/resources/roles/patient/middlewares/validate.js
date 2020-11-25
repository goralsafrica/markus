import joi from "joi";
import { formatJoiError } from "../../../../utilities";

const addPatientValidatorSchema = joi.object().keys({
  firstName: joi.string().trim().required(),
  lastName: joi.string().trim().required(),
  phone: joi
    .string()
    .trim()
    .required()
    .regex(/^(\d{11})$/)
    .rule({ message: "phone number must be 11 digits" }),
  email: joi.string().email().trim(),
  residentAddress: joi.string().trim(),
  workAddress: joi.string().trim(),
  dob: joi.date().required(),
  gender: joi.string().required().valid("male", "female").trim(),
  bloodGroup: joi.string().trim(), //.required().trim(),
  nextOfKin: joi.string().trim(),
  importedEmrCode: joi.string().trim(),
});

export async function addPatientValidator(req, res, next) {
  try {
    req.body = await addPatientValidatorSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    return next();
  } catch (err) {
    const errors = formatJoiError(err);
    next({ status: 400, errors, message: "validation failed" });
  }
}
