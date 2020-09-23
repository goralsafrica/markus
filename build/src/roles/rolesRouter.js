"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _routes = _interopRequireDefault(require("./hospital/routes"));

// import moderatorRouter from "./moderator/moderator.router";
// import branchRouter from "./branch/routes";
// import departmentRouter from "./department/routes";
// import staffRouter from "./staff/staffRouter";
// import patientRouter from "./patient/router";
// import * as authMiddleware from "./auth/auth.middleware";
// import verifyStaff from "./staff/middlewares/auth";
var rolesRouter = (0, _express.Router)();
rolesRouter.get("/", function (req, res) {
  res.json({
    message: "welcome to the roles module"
  });
});
rolesRouter.use("/hospital", _routes["default"]); // //apiRouter.use(authMiddleware.verifyToken, verifyStaff);
// apiRouter.use("/staff", staffRouter);
// apiRouter.use("/department", departmentRouter);
// apiRouter.use("/branch", branchRouter);
// apiRouter.use("/hospital", hospitalRouter);
// apiRouter.use("/moderator", moderatorRouter);
// apiRouter.use("/patient", patientRouter);
//staff

var _default = rolesRouter;
exports["default"] = _default;