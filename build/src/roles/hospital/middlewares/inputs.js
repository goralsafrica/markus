"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerValidator = registerValidator;
exports.updateHospitalValidator = updateHospitalValidator;
exports.registerBranchValidator = registerBranchValidator;

var _isEmpty = _interopRequireDefault(require("is-empty"));

var _validator = _interopRequireDefault(require("validator"));

var _utilities = require("../../../utilities");

var _Hospital = _interopRequireDefault(require("../models/Hospital"));

function registerValidator(req, res, next) {
  var errors = {};
  var data = {};
  data.hospitalName = !(0, _isEmpty["default"])(req.body.hospitalName) ? req.body.hospitalName : "";
  data.hospitalEmail = !(0, _isEmpty["default"])(req.body.hospitalEmail) ? req.body.hospitalEmail : "";
  data.hospitalPhone = !(0, _isEmpty["default"])(req.body.hospitalPhone) ? req.body.hospitalPhone : "";
  data.password = !(0, _isEmpty["default"])(req.body.password) ? req.body.password : "";
  data.adminFirstName = !(0, _isEmpty["default"])(req.body.adminFirstName) ? req.body.adminFirstName : "";
  data.adminLastName = !(0, _isEmpty["default"])(req.body.adminLastName) ? req.body.adminLastName : "";
  data.adminEmail = !(0, _isEmpty["default"])(req.body.adminEmail) ? req.body.adminEmail : "";
  data.adminPhone = !(0, _isEmpty["default"])(req.body.adminPhone) ? req.body.adminPhone : "";
  data.url = !(0, _isEmpty["default"])(req.body.url) ? req.body.url : ""; // check for empty fields

  Object.values(data).some(function (val) {
    return (0, _isEmpty["default"])(val);
  }) ? errors.request = "All fields are required" : "";

  if ((0, _isEmpty["default"])(errors)) {
    // VALIDATION RULES
    [data.hospitalName, data.adminFirstName, data.adminLastName].some(function (val) {
      return !_validator["default"].isAlpha(_validator["default"].blacklist(val, [" ", "-"]));
    }) ? errors.push("invalid name(s)") : "";
    [data.hospitalEmail, data.adminEmail].some(function (val) {
      return !_validator["default"].isEmail(val);
    }) ? errors.push("invalid email(s)") : "";
    [data.adminPhone, data.hospitalPhone].some(function (val) {
      return !_validator["default"].isMobilePhone(val);
    }) ? errors.push("invalid phone number(s)") : "";
  }

  if (!(0, _isEmpty["default"])(errors)) return res.send((0, _utilities.badRequestError)(errors, "failed to create new enviroment"));
  req.body = (0, _utilities.sanitize)(_validator["default"], data);
  next();
}

function updateHospitalValidator(req, res, next) {
  var errors = {};
  var data = {};
  data.name = req.body.name ? req.body.name : "";
  data.email = req.body.email ? req.body.email : "";
  data.phone = req.body.phone ? req.body.phone : "";

  if ((0, _isEmpty["default"])(data.name) || !_validator["default"].isAlpha(_validator["default"].blacklist(data.name, ["-", " "]))) {
    errors.name = "invalid hospital name";
  }

  if ((0, _isEmpty["default"])(data.phone) || !_validator["default"].isMobilePhone(data.phone)) errors.phone = "invalid phone number";
  if ((0, _isEmpty["default"])(data.email) || !_validator["default"].isEmail(data.email)) errors.email = "invalid email address";
  if (!(0, _isEmpty["default"])(errors)) return res.send((0, _utilities.badRequestError)(errors, "failed to update profile"));
  req.body = (0, _utilities.sanitize)(_validator["default"], data);
  next();
}

function registerBranchValidator(req, res, next) {
  var errors = [];
  var data = {};
  data.address = !(0, _isEmpty["default"])(req.body.address) ? req.body.address : "";
  data.city = !(0, _isEmpty["default"])(req.body.city) ? req.body.city : "";
  data.state = !(0, _isEmpty["default"])(req.body.state) ? req.body.state : "";
  data.country = !(0, _isEmpty["default"])(req.body.country) ? req.body.country : ""; // check for empty fields

  Object.values(data).some(function (val) {
    return (0, _isEmpty["default"])(val);
  }) ? errors.push("All fields are required") : "";

  if (!errors.length) {
    // VALIDATION RULES
    [data.country, data.city, data.state].some(function (val) {
      return !_validator["default"].isAlpha(_validator["default"].blacklist(val, [" ", "-"]));
    }) ? errors.push("invalid name(s)") : "";
  }

  if (errors.length) return res.status(400).send({
    data: null,
    errors: errors,
    message: "hospital branch creation failed"
  });
  req.body = (0, _utilities.sanitize)(_validator["default"], data);
  next();
}