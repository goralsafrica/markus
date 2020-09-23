"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _main = _interopRequireDefault(require("./main.router"));

var _middlewares = require("../middlewares");

var _staff = _interopRequireDefault(require("./staff.router"));

var departmentRouter = (0, _express.Router)();
departmentRouter.use(_middlewares.verifyHOD);
departmentRouter.use("/staff", _staff["default"]);
departmentRouter.use("/", _main["default"]);
var _default = departmentRouter;
exports["default"] = _default;