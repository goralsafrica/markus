"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loginValidator;

var _validator = _interopRequireDefault(require("validator"));

var _isEmpty = _interopRequireDefault(require("is-empty"));

var _utilities = require("../../utilities");

//IMPORT MOODULES

/**
 *
 * @param req
 * @param res
 * @param next
 *
 * @desc validates user inputs. sends errors and stops current endpoint work if any.
 */
function loginValidator(req, res, next) {
  var errors = {};
  var data = {};
  data.id = req.body.id ? req.body.id : "";
  data.hospital = req.body.hospital ? req.body.hospital : "";
  data.password = req.body.password ? req.body.password : "";
  var hasEmpty = Object.values(data).some(function (prop) {
    return (0, _isEmpty["default"])(prop);
  });

  if (hasEmpty) {
    errors.request = "all fields are required";
    return next({
      status: 400,
      errors: errors,
      message: "login failure"
    });
  }

  if (!_validator["default"].isMongoId(data.hospital)) {
    errors.hospital = "invalid hospital id";
  }

  if (!(0, _isEmpty["default"])(data)) return next((0, _utilities.badRequestError)(errors, "bad request"));
  data.id = data.id.toUpperCase();
  req.body = serializeInput(data);
  next();
}

function serializeInput(data) {
  for (var prop in data) {
    data[prop] = _validator["default"].trim(data[prop]);
    data[prop] = _validator["default"].escape(data[prop]);
  }

  return data;
}