import jwt from "jsonwebtoken";
import * as config from "../config";

export function deriveToken(hospital, staff) {
  return jwt.sign(
    {
      hospital,
      staff,
    },
    config.secretKey
  );
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

export function unAuthorizedRequestError(message) {
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
