import joi from "joi";
import joiObjectid from "joi-objectid";
import { formatJoiError, formatNestedError } from "../../../utilities";

joi.objectID = joiObjectid(joi, "invalid id");

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

const attachmentSchema = joi.object().keys({
  fileName: joi.string().required(),
  extension: joi.string().required(),
  file: joi.string().required(),
  objectURL: joi.string().required(),
  s3FilePath: joi.string().required(),
  TranscriptionJobName: joi.string().required(),
  duration: joi.number().required(),
  startTime: joi.date().required(),
  endTime: joi.date().required(),
});

const emrValidation = joi.object().keys({
  patient: joi.objectID().required().trim(),
  attachment: attachmentSchema,
});

export async function validateEMRForm(req, res, next) {
  try {
    req.body = await emrValidation.validateAsync(req.body, opts);
    next();
  } catch (err) {
    const errors = formatNestedError(err);
    return res
      .status(400)
      .json({ data: null, errors, message: "emr entry validation failed" });
  }
}

const getSessionsSchema = joi.object().keys({
  status: joi.string().valid(...["uninitialized", "pending", "transcribed"]),
});

export async function getSessionsValidator(req, res, next) {
  try {
    req.query = await getSessionsSchema.validateAsync(req.query, opts);
    return next();
  } catch (err) {
    const errors = formatJoiError(err);
    return next({
      status: 400,
      errors,
      message: "failed to get sessions",
    });
  }
}

const updateTransciptionSchema = joi.object().keys({
  status: joi
    .string()
    .valid(...["uninitialized", "pending", "transcribed"])
    .required(),
  conversation: joi.objectID().required(),
});

export async function updateTransctriptionValidator(req, res, next) {
  try {
    req.body = await updateTransciptionSchema.validateAsync(req.body, opts);
    return next();
  } catch (err) {
    const errors = formatJoiError(err);
    return next({
      status: 400,
      errors,
      message: "failed to get sessions",
    });
  }
}
