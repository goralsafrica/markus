export default async function verifyToken(req, res, next) {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ").pop()
    : "0918ytfcvbnjuytrbnkuytrdcv";
  try {
    const data = await utils.verifyJWT(token);
    req.credentials = data;
    next();
  } catch (err) {
    return next([401, ["invalid credentials"], "unauthorized request"]);
  }
}
