"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "MainController", {
  enumerable: true,
  get: function get() {
    return _main["default"];
  }
});
Object.defineProperty(exports, "BranchDepartmentController", {
  enumerable: true,
  get: function get() {
    return _department["default"];
  }
});
Object.defineProperty(exports, "BranchStaffController", {
  enumerable: true,
  get: function get() {
    return _staff["default"];
  }
});

var _main = _interopRequireDefault(require("./main.controller"));

var _department = _interopRequireDefault(require("./department.controller"));

var _staff = _interopRequireDefault(require("./staff.controller"));