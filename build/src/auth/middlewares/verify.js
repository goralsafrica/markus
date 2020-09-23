"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyUser = verifyUser;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utilities = require("../../utilities");

function verifyUser(_x, _x2, _x3) {
  return _verifyUser.apply(this, arguments);
}

function _verifyUser() {
  _verifyUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.headers.authorization ? req.headers.authorization.split(" ").pop() : "0918ytfcvbnjuytrbnkuytrdcv";
            _context.prev = 1;
            _context.next = 4;
            return (0, _utilities.verifyToken)(token);

          case 4:
            data = _context.sent;
            req.credentials = data;
            next();
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.error("ehn", _context.t0);
            return _context.abrupt("return", next({
              status: 401,
              errors: {
                request: "invalid credentials"
              },
              message: "unauthorized request"
            }));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _verifyUser.apply(this, arguments);
}