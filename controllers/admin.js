var User = require("../models/User");
var Department = require("../models/Department");

exports.createNewUser = async function (req, res) {
  var user = await User.find({ email: req.body.email });
  console.log(user);
  if (user)
    return res.status(400).json({
      error: `email ${req.body.email} already exists`,
    });

  console.log("user");
};

exports.createNewDepartment = async function (req, res) {
  var department = await Department.find({ email: req.body.department });
  console.log(department);
  if (department)
    return res.status(400).json({
      error: `${req.body.department} already exists`,
    });

  console.log("user");
};
