"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "loginValidator", {
  enumerable: true,
  get: function get() {
    return _login["default"];
  }
});
Object.defineProperty(exports, "verifyUser", {
  enumerable: true,
  get: function get() {
    return _verify.verifyUser;
  }
});

var _login = _interopRequireDefault(require("./login"));

var _verify = require("./verify");