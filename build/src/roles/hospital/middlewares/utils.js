"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateCodes = generateCodes;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Hospital = _interopRequireDefault(require("../models/Hospital"));

function generateCodes(_x, _x2, _x3) {
  return _generateCodes.apply(this, arguments);
}

function _generateCodes() {
  _generateCodes = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var hospital, code, exists;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            hospital = req.body.hospitalName.split(" ").join("");
            code = hospital[0] + hospital[1] + hospital[2] + Math.floor(Math.random() * 101);
            _context.next = 4;
            return _Hospital["default"].exists({
              code: code
            });

          case 4:
            exists = _context.sent;

            if (!exists) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", generateCodes(req, res, next));

          case 7:
            req.body.hospitalCode = code.toUpperCase();
            next();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _generateCodes.apply(this, arguments);
}