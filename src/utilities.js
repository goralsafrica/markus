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

export function verifyJWT(payload) {
  return jwt.verify(payload, config.secretKey);
}
