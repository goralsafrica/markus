"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _controllers = require("../controllers/");

var depatmentRouter = (0, _express.Router)();
depatmentRouter.get("/", _controllers.DepartmentController.getDetails);
var _default = depatmentRouter;
exports["default"] = _default;