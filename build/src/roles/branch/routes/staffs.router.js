"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _controllers = require("../controllers/");

var staffRouter = (0, _express.Router)();
staffRouter.get("/", _controllers.BranchStaffController.getStaffs); //the following routes are only accessible if the branch head has priviledges

staffRouter.put("/:staffid", _controllers.BranchStaffController.updateStaff);
var _default = staffRouter;
exports["default"] = _default;