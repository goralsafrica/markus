"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _moderator = _interopRequireDefault(require("./moderator.controller"));

var moderatorRouter = _express["default"].Router(); // Gets all registered hospitals


moderatorRouter.get("/hospital", _moderator["default"].index);
moderatorRouter.get("/hospital/:id", _moderator["default"].show);
var _default = moderatorRouter;
exports["default"] = _default;