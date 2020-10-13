import { verifyToken, unAuthorizedRequestError } from "../../utilities";
export async function verifyUser(req, res, next) {
  if (!req.headers.authorization) {
    return next(unAuthorizedRequestError());
  }
  const token = req.headers.authorization.split(" ").pop();
  try {
    const data = await verifyToken(token);
    if (!data) return unAuthorizedRequestError();
    req.credentials = data;
    next();
  } catch (err) {
    return next(unAuthorizedRequestError());
  }
}

export async function verifyEsessionUser(req, res, next) {
  if (!req.body.token) {
    return next({
      status: 400,
      errors: {
        token: "invalid token",
      },
      message: "authentication failed",
    });
  }
  try {
    const data = await verifyToken(req.body.token);
    if (!data) return unAuthorizedRequestError();
    req.credentials = data;
    next();
  } catch (err) {
    return next(unAuthorizedRequestError());
  }
}
