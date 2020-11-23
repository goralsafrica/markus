import joi from "joi";
import joiObjectid from "joi-objectid";

joi.objectID = joiObjectid(joi, "invalid patient id");

const requiresNumber = () => joi.number().required();

const opts = { abortEarly: false };

const emrValidation = joi.object().keys({
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

export async function validateEMRForm(req, res, next) {
  try {
    req.body = await emrValidation.validateAsync(req.body, opts);
    console.log(req.body);
  } catch (err) {
    console.log(err.details);
  }
}
