import jwt from "jsonwebtoken";
import * as config from "../config";

export function deriveToken(hospital, staff, temporary = false) {
  let payload = {
    hospital,
    staff,
  };
  if (temporary) payload.temporary = true;
  return jwt.sign(payload, config.secretKey);
}

export function verifyToken(payload) {
  return jwt.verify(payload, process.env.SECRET_KEY);
}

/**
 *
 * @param {} errors object containing the errors
 * @param {String} message summarized error message
 */

export function serverError(error, message) {
  return {
    status: 500,
    result: {
      data: null,
      errors: {
        request: error,
      },
      message,
    },
  };
}

/**
 *
 * @param {Object} errors object containing the errors
 * @param {String} message summarized error message
 */

export function badRequestError(errors, message) {
  return Promise.resolve({
    status: 400,
    result: {
      data: null,
      errors,
      message,
    },
  });
}

export function notFoundError(errors, message) {
  return Promise.resolve({
    status: 404,
    result: {
      data: null,
      errors,
      message,
    },
  });
}

/**
 *
 * @param {String} message summarized error message
 */

export function unAuthorizedRequestError() {
  return {
    status: 401,
    errors: {
      request: "request was made with invalid credentials",
    },
    message: "failed to fulfill request",
  };
}

/**
 *
 * @param {} data object containing the data
 * @param {String} message summarized success  message
 */

export function successMessage(data, message) {
  return Promise.resolve({
    status: 200,
    result: {
      data,
      errors: null,
      message,
    },
  });
}

export function sanitize(validator, data) {
  for (const prop in data) {
    data[prop] = validator.trim(data[prop]);
    data[prop] = validator.escape(data[prop]);
  }
  return data;
}

export function getDays() {
  return [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
}

export async function generateStaffCode(model, hospital) {
  try {
    const lastEntry = await model
      .findOne({ hospital })
      .sort({ field: "asc", _id: -1 })
      .limit(1);
    if (!lastEntry) return Promise.resolve("001");
    const padding = Number(lastEntry.code) > 10 ? 1 : 2;
    return Promise.resolve(
      String(Number(lastEntry.code) + 1).padStart(
        String(Number(lastEntry.code)).length + padding,
        "0"
      )
    );
  } catch (err) {
    return Promise.reject(err);
  }
}

export function formatJoiError(err) {
  const errors = {};
  for (const msg of err.details) {
    errors[msg.message.split('"')[1]] = msg.message.split('"').join("");
  }
  return errors;
}
