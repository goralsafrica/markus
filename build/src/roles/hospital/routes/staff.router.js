"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _controllers = require("../controllers/");

var Middlewares = _interopRequireWildcard(require("../../staff/middlewares/registration"));

var staffRouter = _express["default"].Router(); //gets the details of a particular hospital


staffRouter.post("/", // Middlewares.inputValidator,
//Middlewares.staffChecker,
_controllers.StaffController.create);
staffRouter.get("/", _controllers.StaffController.findAll);
staffRouter.get("/:id", _controllers.StaffController.findOne);
staffRouter.put("/:staffid", _controllers.StaffController.update);
staffRouter["delete"]("/:staffid", _controllers.StaffController["delete"]); // remove from hospital

staffRouter["delete"]("/:branchid/:staffid", _controllers.StaffController.remove); // remove from hospital
// staffRouter.put("/", Controllers.StaffController.update);

var _default = staffRouter;
exports["default"] = _default;