"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _main = _interopRequireDefault(require("./main.router"));

var _middlewares = require("../middlewares");

var _staffs = _interopRequireDefault(require("./staffs.router"));

var _departments = _interopRequireDefault(require("./departments.router"));

// import departmentRouter from "./department.router";
// import staffRouter from "./staff.router";
var branchRouter = (0, _express.Router)();
branchRouter.use(_middlewares.verifyHeadOfBranch);
branchRouter.use("/staff", _staffs["default"]);
branchRouter.use("/department", _departments["default"]);
branchRouter.use("/", _main["default"]);
var _default = branchRouter;
exports["default"] = _default;