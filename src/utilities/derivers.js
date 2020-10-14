import jwt from "jsonwebtoken";
import * as config from "../../config";

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

export function extractToken(req) {
  return req.headers.authorization.split(" ").pop();
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

export function encryptID(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY.toUpperCase(), {
    expiresIn: 1000 * 60 * 60 * 3,
  });
}

export function decryptID(payload) {
  return jwt.verify(payload, process.env.SECRET_KEY.toUpperCase());
}
