const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");
exports.inSession = function (req, res, next) {
  console.log(req.headers);
  if (!req.headers.authorization)
    return res.status(401).json({
      error: "Unauthorized -_- ",
    });
  var token = req.headers.authorization.split(" ").pop();
  try {
    var payload = jwt.verify(token, secretKey);
    req.locals.payload = payload;
  } catch (err) {
    next({
      status: 400,
      message: "invalid credentials",
    });
  }
  next();
};
