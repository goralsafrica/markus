var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var User = require("../models/User");

exports.clientLogin = async function (req, res) {
  const user = await User.find({ email: req.body.email });

  if (!user)
    return res.status(400).json({
      error: `email ${req.body.email} doesn't match any record`,
    });

  console.log("user");
};
