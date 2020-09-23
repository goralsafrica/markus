"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _controllers = require("../controllers/");

var _middlewares = require("../middlewares");

var _middlewares2 = require("../../../auth/middlewares");

var mainRouter = _express["default"].Router(); //gets the details of a particular hospital


mainRouter.post("/", _middlewares.registerValidator, _middlewares.verifyNewHospital, _middlewares.generateCodes, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var details, r;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            details = req.body;
            _context.next = 3;
            return _controllers.HospitalController.create(details);

          case 3:
            r = _context.sent;
            res.status(r.status).json(r.result);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
mainRouter.get("/", _middlewares2.verifyUser, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var details, r;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            details = req.credentials;
            _context2.next = 3;
            return _controllers.HospitalController.findOne(details);

          case 3:
            r = _context2.sent;
            res.status(r.status).json(r.result);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
mainRouter.put("/", _middlewares2.verifyUser, _middlewares.updateHospitalValidator,
/*#__PURE__*/
//verifyAdmin,
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var r;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _controllers.HospitalController.update(req);

          case 2:
            r = _context3.sent;
            res.status(r.status).json(r.result);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = mainRouter;
exports["default"] = _default;