"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inputValidator = inputValidator;
exports.staffChecker = staffChecker;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Hospital = _interopRequireDefault(require("../../hospital/models/Hospital"));

var _Staff = _interopRequireDefault(require("../models/Staff"));

var _validator = _interopRequireDefault(require("validator"));

var _isEmpty = _interopRequireDefault(require("is-empty"));

//IMPORT MOODULES

/**
 *
 * @param req
 * @param res
 * @param next
 *
 * @desc validates lmao inputs. sends errors and stops current endpoint work if any.
 */
function inputValidator(_x, _x2, _x3) {
  return _inputValidator.apply(this, arguments);
}

function _inputValidator() {
  _inputValidator = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var errors, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            errors = {};
            data = req.body;
            data.email = !(0, _isEmpty["default"])(data.email) ? data.email : "";
            data.name = !(0, _isEmpty["default"])(data.name) ? data.name : "";
            data.hospital = !(0, _isEmpty["default"])(data.hospital) ? data.hospital : "";
            data.password = !(0, _isEmpty["default"])(data.password) ? data.password : "";

            if (_validator["default"].isEmpty(data.email) || !_validator["default"].isEmail(data.email)) {
              errors.email = "invalid email";
            }

            if (_validator["default"].isEmpty(data.password)) {
              errors.password = "password is required";
            }

            if (_validator["default"].isEmpty(data.hospital)) {
              errors.password = "Invalid credentials";
            }

            if ((0, _isEmpty["default"])(errors)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              data: null,
              errors: Object.values(errors),
              message: "failed to create user"
            }));

          case 11:
            next();

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _inputValidator.apply(this, arguments);
}

function staffChecker(_x4, _x5, _x6) {
  return _staffChecker.apply(this, arguments);
}

function _staffChecker() {
  _staffChecker = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _staffChecker.apply(this, arguments);
}