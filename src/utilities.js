import jwt from "jsonwebtoken";
import * as config from "../config";

/**
 *
 * @param {ObjectId} hospital
 * @param {ObjectId} staff
 * derives a jwt
 */

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

export function serverError(error, message) {
  return {
    status: 500,
    data: null,
    errors: {
      request: error,
    },
    message,
  };
}
export function badRequestError(errors, message) {
  return {
    status: 400,
    data: null,
    errors,
    message,
  };
}
