"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var adminHospitalMiddleWare = _interopRequireWildcard(require("../middlewares/register"));

var _controllers = require("../controllers/");

var departmentRouter = _express["default"].Router(); //gets the details of a particular hospital


departmentRouter.post("/", _controllers.DepartmentController.create);
departmentRouter.get("/", _controllers.DepartmentController.findAll);
departmentRouter.get("/:id", _controllers.DepartmentController.findOne);
departmentRouter["delete"]("/:departmentid", _controllers.DepartmentController["delete"]);
var _default = departmentRouter;
exports["default"] = _default;