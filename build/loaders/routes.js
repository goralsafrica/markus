"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _apiRouter = _interopRequireDefault(require("../src/apiRouter"));

function _default(app, config) {
  return new Promise(function (resolve, reject) {
    app.use((0, _cors["default"])());
    app.use(_express["default"].json());
    app.use(_express["default"].urlencoded({
      extended: false
    })); //main entry for APIs

    app.use("/api", _apiRouter["default"]); //resolve if no errors

    resolve();
  });
}