import jwt from "jsonwebtoken";
import * as config from "../config";

export function deriveToken(hospital, staff, slug, temporary = false) {
  if (!staff || !hospital)
    throw (new Error().message = {
      message: "incomplete details",
      data: { hospital, staff },
    });
  let payload = {
    hospital,
    staff,
    slug,
    temporary,
  };
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

export function encrypt(payload, expiresIn = 1000 * 60 * 60 * 3) {
  return jwt.sign(payload, process.env.SECRET_KEY.toUpperCase(), {
    expiresIn,
  });
}

export function decrypt(payload) {
  return jwt.verify(payload, process.env.SECRET_KEY.toUpperCase());
}

export function randomNumber(amount = 6) {
  const multiplier = 10 ** amount;
  const token = String(Math.floor(Math.random() * multiplier));
  if (token.length == amount) return token;
  let extra = "";
  for (let i = 0; i < amount - token.length; i++) {
    extra += String(Math.floor(Math.random() * (9 - 1) + 1));
  }
  extra += token + "";
  return extra;
}

export function getS3ObjectRelativePath(url) {
  const splitURL = url.split("/");
  return splitURL.slice(-2).join("/");
}
