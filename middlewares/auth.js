const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");

exports.inSession = function (req, res, next) {
  if (!req.headers.authorization)
    return res.status(401).json({
      error: "Unauthorized -_- ",
    });
  var token = req.headers.authorization.split(" ").pop();
  try {
    var payload = jwt.verify(token, secretKey);
    req.user = payload;
  } catch (err) {
    console.error(err);
    next({
      status: 400,
      message: "invalid credentials",
    });
  }
  next();
};

exports.isAdmin = function (req, res, next) {
  var isAdmin = req.user.role == "admin";
  if (isAdmin) return next();
  return res.status(401).json({
    error: "unauthorized",
  });
};
