import ExpiredToken from "../models/ExpiredToken";
import { verifyToken, unAuthorizedRequestError } from "../../utilities";

export async function verifyUser(req, res, next) {
  if (!req.headers.authorization) {
    return next(unAuthorizedRequestError());
  }
  const token = req.headers.authorization.split(" ").pop();
  try {
    const data = await verifyToken(token);
    if (!data || expired) return next(unAuthorizedRequestError());
    req.credentials = data;
    next();
  } catch (err) {
    return next(unAuthorizedRequestError());
  }
}

export async function verifyEsessionUser(req, res, next) {
  if (!req.headers.authorization) {
    return next(unAuthorizedRequestError());
  }
  const token = req.headers.authorization.split(" ").pop();
  try {
    const data = await verifyToken(token);
    const expired = await isExpired(token);
    if (!data || expired || !data.temporary)
      return next(unAuthorizedRequestError());
    req.credentials = data;
    next();
  } catch (err) {
    return next(unAuthorizedRequestError());
  }
}

async function isExpired(token) {
  try {
    return await ExpiredToken.exists({ token });
  } catch (err) {
    return new Error("failed to validate");
  }
}
