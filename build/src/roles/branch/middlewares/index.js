"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyHeadOfBranch = verifyHeadOfBranch;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Staff = _interopRequireDefault(require("../../staff/models/Staff"));

function verifyHeadOfBranch(_x, _x2, _x3) {
  return _verifyHeadOfBranch.apply(this, arguments);
}

function _verifyHeadOfBranch() {
  _verifyHeadOfBranch = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var staff;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            staff = req.staff;

            if (!(!staff.administrativeRole || !staff.administrativeRole.branch || staff.administrativeRole.name != "head of branch")) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", next([401, ["You do not have permission to perform this operation"], "permission denied"]));

          case 3:
            next();

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _verifyHeadOfBranch.apply(this, arguments);
}