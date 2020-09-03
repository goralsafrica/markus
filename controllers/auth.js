var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var User = require("../models/User");
var { secretKey } = require("../config");

exports.clientLogin = async function (req, res, next) {
  const user = await User.findOne({ email: req.body.email })
    .populate("department")
    .select("+password");

  if (!user)
    return res.status(400).json({
      error: `email ${req.body.email} doesn't match any record`,
    });
  bcrypt
    .compare(req.body.password, user.password)
    .then((correct) => {
      if (!correct)
        return res.status(400).json({
          error: "incorrect password",
        });
      var token = jwt.sign(
        {
          email: user.email,
          role: user.role,
          department: user.department.name,
        },
        secretKey,
        { expiresIn: 60 * 60 * 24 }
      );
      res.json({
        message: "login successful",
        token,
      });
    })
    .catch((err) => {
      console.error(err);
      next({
        status: 500,
        message: "server is down :(",
      });
    });
};
