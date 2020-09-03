var bcrypt = require("bcryptjs");
var User = require("../models/User");
var Department = require("../models/Department");

exports.createNewUser = async function (req, res, next) {
  var user = await User.find({ email: req.body.email });
  if (user.length > 0)
    return res.status(400).json({
      error: `email ${req.body.email} already exists`,
    });

  //create new user then
  var newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role,
    department: req.body.departmentId,
  });

  try {
    var hash = await bcrypt.hash(req.body.password, 10);
    newUser.password = await hash;
    await newUser.save();
    const data = await User.find({ email: req.body.email }).populate(
      "department"
    );
    res.json({
      message: "new user created",
      data,
    });
  } catch (error) {
    console.error(error);
    next({ status: 500, message: error });
  }
};

exports.createNewDepartment = async function (req, res) {
  var department = await Department.find({ name: req.body.name.toLowerCase() });
  if (department.length > 0)
    return res.status(400).json({
      error: `${req.body.name} already exists`,
    });

  // create new Department then
  department = await Department.create({
    name: req.body.name.toLowerCase(),
  });

  res.json({
    message: "department has been created successfully",
    department,
  });
};

exports.getDepartments = async function (req, res, next) {
  try {
    var departments = await Department.find();
    res.send(departments);
  } catch (error) {
    console.log(error);
    return next({
      status: 500,
      message: "Server failed to respond :(",
    });
  }
};

exports.getAllUsers = async function (req, res, next) {
  try {
    var users = await User.find({ role: "user" }).populate("department");
    res.send(users);
  } catch (error) {
    console.log(error);
    return next({
      status: 500,
      message: "Server failed to respond :(",
    });
  }
};
