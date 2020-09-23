"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = verifyStaff;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Staff = _interopRequireDefault(require("../models/Staff"));

function verifyStaff(_x, _x2, _x3) {
  return _verifyStaff.apply(this, arguments);
}

function _verifyStaff() {
  _verifyStaff = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$credentials, staff, hospital, existingStaff;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$credentials = req.credentials, staff = _req$credentials.staff, hospital = _req$credentials.hospital;
            _context.prev = 1;
            _context.next = 4;
            return _Staff["default"].findById(staff, hospital).select("firstName lastName email role administrativeRole").populate("role").populate("role.category").populate("administrativeRole.name").populate("administrativeRole.branch").populate("administrativeRole.department");

          case 4:
            existingStaff = _context.sent;

            if (existingStaff) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", next([401, ["permission denied"], "unauthorized request"]));

          case 7:
            req.staff = existingStaff;
            next();
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](1);
            console.error(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 11]]);
  }));
  return _verifyStaff.apply(this, arguments);
}