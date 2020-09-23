"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("./auth.controller"));

var _middlewares = require("./middlewares");

var authRouter = _express["default"].Router();

authRouter.post("/workspace", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var url, _yield$AuthController, status, result;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = req.body.url;
            _context.next = 3;
            return _auth["default"].verifyWorkspace(url);

          case 3:
            _yield$AuthController = _context.sent;
            status = _yield$AuthController.status;
            result = _yield$AuthController.result;
            res.status(status).json(result);

          case 7:
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
authRouter.post("/login", _middlewares.loginValidator, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var details, r;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            details = req.body;
            _context2.next = 3;
            return _auth["default"].login(details);

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
}()); //authRouter.post("/logout",)

var _default = authRouter;
exports["default"] = _default;