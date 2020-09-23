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


departmentRouter.post("/", _controllers.PatientController.create);
departmentRouter.get("/", _controllers.PatientController.findAll);
departmentRouter.get("/:id", _controllers.PatientController.findOne);
var _default = departmentRouter;
exports["default"] = _default;