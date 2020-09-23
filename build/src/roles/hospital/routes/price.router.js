"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _controllers = require("../controllers/");

//import { adminHospitalMiddleWare }  from "../middlewares/register";
var priceRouter = _express["default"].Router(); //gets the details of a particular hospital


priceRouter.post("/", _controllers.HospitalPriceController.create);
priceRouter.get("/", _controllers.HospitalPriceController.findAll);
priceRouter.put("/:priceid", _controllers.HospitalPriceController.update);
priceRouter["delete"]("/:priceid", _controllers.HospitalPriceController["delete"]);
var _default = priceRouter;
exports["default"] = _default;