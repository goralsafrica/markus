"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _controllers = require("../controllers/");

var mainRouter = (0, _express.Router)();
mainRouter.get("/", _controllers.MainController.getDetails);
var _default = mainRouter;
exports["default"] = _default;