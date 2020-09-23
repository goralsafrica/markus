"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyAdmin = verifyAdmin;
exports.verifyNewHospital = verifyNewHospital;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Staff = _interopRequireDefault(require("../../staff/models/Staff"));

var _Hospital = _interopRequireDefault(require("../models/Hospital"));

function verifyAdmin(_x, _x2, _x3) {
  return _verifyAdmin.apply(this, arguments);
}

function _verifyAdmin() {
  _verifyAdmin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$credentials, staff, hospital, existingStaff;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$credentials = req.credentials, staff = _req$credentials.staff, hospital = _req$credentials.hospital;
            _context.prev = 1;
            _context.next = 4;
            return _Staff["default"].findById(staff, hospital).select("priviledged").populate("role");

          case 4:
            existingStaff = _context.sent;

            if (!(!existingStaff || existingStaff.role.name != "admin" || existingStaff.priviledged !== 1)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", next([401, ["permission denied"], "unauthorized request"]));

          case 7:
            next();
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            console.error(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10]]);
  }));
  return _verifyAdmin.apply(this, arguments);
}

function verifyNewHospital(_x4, _x5, _x6) {
  return _verifyNewHospital.apply(this, arguments);
}

function _verifyNewHospital() {
  _verifyNewHospital = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var exists;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Hospital["default"].exists({
              $or: [{
                email: req.body.hospitalEmail
              }, {
                phone: req.body.hospitalPhone
              }]
            });

          case 2:
            exists = _context2.sent;

            if (exists) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", next());

          case 5:
            return _context2.abrupt("return", next({
              status: 400,
              errors: {
                request: "phone number / hospital already belongs to another hospital"
              },
              message: "failed to create hospital"
            }));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _verifyNewHospital.apply(this, arguments);
}