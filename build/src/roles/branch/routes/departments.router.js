"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _controllers = require("../controllers/");

var departmentRouter = (0, _express.Router)();
departmentRouter.get("/", _controllers.BranchDepartmentController.getDepartments);
departmentRouter.get("/:departmentid", _controllers.BranchDepartmentController.getDepartment); //these routes can only be accessed if branch owner has been granted permission

departmentRouter.post("/", _controllers.BranchDepartmentController.add);
departmentRouter["delete"]("/:departmentid", _controllers.BranchDepartmentController.removeDepartment);
var _default = departmentRouter;
exports["default"] = _default;