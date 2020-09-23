"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _main = _interopRequireDefault(require("./main.router"));

// import branchRouter from "./branch.router";
// import departmentRouter from "./department.router";
// import staffRouter from "./staff.router";
// import patientRouter from "./patient.router";
// import priceRouter from "./price.router";
// import healthinsuranceRouter from "./healthinsurance.router";
// import labRouter from "./lab.router";
// import * as authMiddleware from "../../auth/auth.middleware";
// import * as adminAuthMiddleware from "../middlewares/auth";
var hospitalRouter = _express["default"].Router(); //gets the details of a particular hospital


hospitalRouter.use("/", _main["default"]); // middleware to verify hospital admin :)
// hospitalRouter.use(authMiddleware.verifyToken, adminAuthMiddleware.verifyAdmin);
// hospitalRouter.use("/branch", branchRouter);
// hospitalRouter.use("/department", departmentRouter);
// hospitalRouter.use("/staff", staffRouter);
// hospitalRouter.use("/patient", patientRouter);
// hospitalRouter.use("/price", priceRouter);
// hospitalRouter.use("/healthinsurance", healthinsuranceRouter);
// hospitalRouter.use("/lab", labRouter);

var _default = hospitalRouter;
exports["default"] = _default;