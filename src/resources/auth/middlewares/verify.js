import ExpiredToken from "../models/ExpiredToken";
import Invite from "../models/Invite";
import { verifyToken, unAuthorizedRequestError } from "../../../utilities";

export async function verifyUser(req, res, next) {
  if (!req.headers.authorization) {
    return next(unAuthorizedRequestError());
  }
  const token = req.headers.authorization.split(" ").pop();
  try {
    const data = await verifyToken(token);
    const expired = await isExpired(token);
    if (!data || expired || data.temporary)
      return next(unAuthorizedRequestError());
    req.credentials = data;
    next();
  } catch (err) {
    return next(unAuthorizedRequestError());
  }
}

export async function verifyTemporaryToken(req, res, next) {
  if (!req.headers.authorization) {
    return next(unAuthorizedRequestError());
  }
  const token = req.headers.authorization.split(" ").pop();
  try {
    const data = await verifyToken(token);
    const expired = await isExpired(token);
    if (req.url !== "/workspace") {
      if (!data || expired || !data.temporary)
        return next(unAuthorizedRequestError());
    }
    data.token = token;
    req.credentials = data;
    next();
  } catch (err) {
    return next(unAuthorizedRequestError());
  }
}

export async function verifyInviteToken(req, res, next) {
  try {
    if (!req.query.token || !(await Invite.exists({ _id: req.query.token })))
      throw new Error("invaid/expired token");
    next();
  } catch (err) {
    return next({
      status: 404,
      errors: {
        request: err.message,
      },
      message: "verification failed",
    });
  }
}

async function isExpired(token) {
  try {
    return await ExpiredToken.exists({ token });
  } catch (err) {
    return new Error("failed to validate");
  }
}
