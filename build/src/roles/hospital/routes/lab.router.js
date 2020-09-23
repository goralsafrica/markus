"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _controllers = require("../controllers/");

//import { adminHospitalMiddleWare }  from "../middlewares/register";
var labRouter = _express["default"].Router(); //gets the details of a particular hospital


labRouter.post("/", _controllers.HospitalLabController.create);
labRouter.get("/", _controllers.HospitalLabController.findAll);
labRouter.put("/:labid", _controllers.HospitalLabController.update);
labRouter["delete"]("/:labid", _controllers.HospitalLabController["delete"]);
var _default = labRouter;
exports["default"] = _default;