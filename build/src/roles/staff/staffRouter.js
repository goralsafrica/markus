"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _main = _interopRequireDefault(require("./controllers/main"));

var staffRouter = (0, _express.Router)();
staffRouter.get("/", _main["default"].getDetails);
staffRouter.post("/resign", _main["default"].sendResignationLetter); // staffRouter.get(
//   "/:departmentid",
//   BranchDepartmentController.getDepartment
// );
// //these routes can only be accessed if branch owner has been granted permission
// staffRouter.post("/", BranchDepartmentController.add);
// staffRouter.delete(
//   "/:departmentid",
//   BranchDepartmentController.removeDepartment
// );

var _default = staffRouter;
exports["default"] = _default;