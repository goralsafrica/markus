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
    if (identifyUser(data)) {
      req.credentials = data;
      return next();
    }
    // else blacklist token and send unauthorzed message
    blacklistToken(token);

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

export async function verifyAnyToken(req, res, next) {
  try {
    const token = extractToken(req);
    let [data, b] = await Promise.all([verifyToken(token), isExpired(token)]);
    const a = Boolean(data);
    b = Boolean(b);
    if (a && !b) {
      req.credentials = data;
      return next();
    }
    if (b) {
      blacklistToken(token);
    }
    return Promise.reject("error");
  } catch (err) {
    console.log(err.message, err.stack);
    return next(unAuthorizedRequestError());
  }
}

export async function verifyInviteToken(req, res, next) {
  try {
    if (!req.query.token || !(await Invite.exists({ _id: req.query.token })))
      throw new Error("invalid/expired token");
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

function blacklistToken(token) {
  return ExpiredToken.create({ token })
    .then(() => console.log("removed"))
    .catch(console.log);
}

async function identifyUser({ staff, hospital }) {
  try {
    const enviroment = await StaffWorkspace.findOne({ staff, hospital })
      .populate("staff")
      .populate("hospital");
    return Boolean(enviroment.staff) && Boolean(enviroment.hospital);
  } catch (err) {
    console.log(err.message);
    return false;
  }
}

export const verifyPermanentToken = verifyUser;
