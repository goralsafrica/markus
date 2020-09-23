"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _controllers = require("../controllers");

//import { adminHospitalMiddleWare }  from "../middlewares/register";
var insuranceRouter = _express["default"].Router(); //gets the details of a particular hospital


insuranceRouter.post("/", _controllers.HospitalHealthInsuranceController.create);
insuranceRouter.get("/", _controllers.HospitalHealthInsuranceController.findAll);
insuranceRouter.put("/:affiliateid", _controllers.HospitalHealthInsuranceController.update);
insuranceRouter["delete"]("/:affiliateid", _controllers.HospitalHealthInsuranceController["delete"]);
var _default = insuranceRouter;
exports["default"] = _default;