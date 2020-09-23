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

var branchRouter = _express["default"].Router(); //gets the details of a particular hospital


branchRouter.post("/", adminHospitalMiddleWare.registerBranchValidator, _controllers.BranchController.create);
branchRouter.get("/", _controllers.BranchController.findAll);
branchRouter.get("/:id", _controllers.BranchController.findOne);
branchRouter.put("/:id", _controllers.BranchController.update); //delete should only be possible if no staff is present again

var _default = branchRouter;
exports["default"] = _default;