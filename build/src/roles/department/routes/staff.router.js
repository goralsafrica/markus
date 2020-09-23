"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _controllers = require("../controllers/");

var staffRouter = (0, _express.Router)();
staffRouter.get("/:id", _controllers.DepartmentStaffController.getStaff); // staffRouter.get(
//   "/:departmentid",
//   BranchDepartmentController.getDepartment
// );

staffRouter.put("/:id", _controllers.DepartmentStaffController.updateStaff); // //these routes can only be accessed if branch owner has been granted permission
// staffRouter.delete(
//   "/:departmentid",
//   BranchDepartmentController.removeDepartment
// );

var _default = staffRouter;
exports["default"] = _default;