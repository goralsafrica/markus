import ExpiredToken from "../models/ExpiredToken";
import Invite from "../models/Invite";
import {
  verifyToken,
  unAuthorizedRequestError,
  extractToken,
} from "../../../utilities";
import Hospital from "../../roles/hospital/models/Hospital";
import Staff from "../../roles/staff/models/Staff";
import StaffWorkspace from "../../roles/staff/models/StaffWorkspace";

export async function verifyUser(req, res, next) {
  // check if header is in request
  if (!req.headers.authorization) return next(unAuthorizedRequestError());

  // extract token
  const token = extractToken(req);
  try {
    // decrypt token and balcklisted tokens
    const [data, expired] = await Promise.all([
      verifyToken(token),
      isExpired(token),
    ]);
    if (!data || expired || data.temporary)
      return next(unAuthorizedRequestError());
    // check if user,hospital and staff workspace exists
    const staffInHospital = await StaffWorkspace.findOne({
      hospital: data.hospital,
      staff: data.staff,
    });
    if (staffInHospital) {
      req.credentials = data;
      return next();
    }
    // else blacklist token and send unauthorzed message
    await ExpiredToken.create({ token });
    return next(unAuthorizedRequestError());
  } catch (err) {
    return next(unAuthorizedRequestError());
  }
}

export async function verifyTemporaryToken(req, res, next) {
  if (!req.headers.authorization) {
    return next(unAuthorizedRequestError());
  }
  const token = extractToken(req);
  try {
    const data = await verifyToken(token);
    const expired = await isExpired(token);
    const exempted =
      req.url !== "/workspace" && req.method.toUpperCase() == "GET";
    if (exempted) {
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
