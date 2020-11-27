import joi from "joi";
import joiObjectid from "joi-objectid";
import { formatJoiError } from "../../../utilities";

joi.objectID = joiObjectid(joi, "invalid patient id");

const requiresNumber = () => joi.number().required();

const opts = { abortEarly: false };

const vitalSignsValidation = joi.object().keys({
  height: requiresNumber(),
  weight: requiresNumber(),
  temperature: requiresNumber(),
  pulse: requiresNumber(),
  respiratoryRate: requiresNumber(),
  bloodOxygenSaturation: requiresNumber(),
  bloodPressure: joi.object().keys({
    systolic: requiresNumber(),
    diastolic: requiresNumber(),
  }),
});

const emrValidation = joi.object().keys({
  patient: joi.objectID().required().trim(),
});

export async function validateEMRForm(req, res, next) {
  try {
    req.body = await emrValidation.validateAsync(req.body, opts);
    console.log(req.body);
  } catch (err) {
    const errors = formatJoiError(err);
    return res
      .status(400)
      .json({ data: null, errors, message: "emr entry validation failed" });
  }
}
