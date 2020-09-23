import { verifyToken } from "../../utilities";
export async function verifyUser(req, res, next) {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ").pop()
    : "0918ytfcvbnjuytrbnkuytrdcv";
  try {
    const data = await verifyToken(token);
    req.credentials = data;
    next();
  } catch (err) {
    console.error("ehn", err);
    return next({
      status: 401,
      errors: { request: "invalid credentials" },
      message: "unauthorized request",
    });
  }
}
