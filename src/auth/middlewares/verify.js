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
