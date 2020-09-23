"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authRouter = _interopRequireDefault(require("./auth/authRouter"));

var _rolesRouter = _interopRequireDefault(require("./roles/rolesRouter"));

var _rosterRouter = _interopRequireDefault(require("./roster/routes/rosterRouter"));

var apiRouter = (0, _express.Router)();
apiRouter.get("/", function (req, res) {
  res.json({
    message: "welcome to the api route"
  });
});
apiRouter.use("/auth", _authRouter["default"]);
apiRouter.use("/roles", _rolesRouter["default"]);
apiRouter.use("/roster", _rosterRouter["default"]); //error handlers

apiRouter.use(function (req, res, next) {
  next({
    status: 404,
    errors: {
      request: "requested resource not found"
    },
    message: "invalid request"
  });
});
apiRouter.use(function (_ref, req, res, next) {
  var status = _ref.status,
      errors = _ref.errors,
      message = _ref.message;
  res.status(status).json({
    data: null,
    errors: errors,
    message: message
  });
});
var _default = apiRouter;
exports["default"] = _default;