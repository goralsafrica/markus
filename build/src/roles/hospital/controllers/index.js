"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "HospitalController", {
  enumerable: true,
  get: function get() {
    return _main["default"];
  }
});
Object.defineProperty(exports, "BranchController", {
  enumerable: true,
  get: function get() {
    return _branch["default"];
  }
});
Object.defineProperty(exports, "DepartmentController", {
  enumerable: true,
  get: function get() {
    return _department["default"];
  }
});
Object.defineProperty(exports, "StaffController", {
  enumerable: true,
  get: function get() {
    return _staff["default"];
  }
});
Object.defineProperty(exports, "PatientController", {
  enumerable: true,
  get: function get() {
    return _patient["default"];
  }
});
Object.defineProperty(exports, "HospitalPriceController", {
  enumerable: true,
  get: function get() {
    return _price["default"];
  }
});
Object.defineProperty(exports, "HospitalHealthInsuranceController", {
  enumerable: true,
  get: function get() {
    return _healthinsurance["default"];
  }
});
Object.defineProperty(exports, "HospitalLabController", {
  enumerable: true,
  get: function get() {
    return _lab["default"];
  }
});

var _main = _interopRequireDefault(require("./main.controller"));

var _branch = _interopRequireDefault(require("./branch.controller"));

var _department = _interopRequireDefault(require("./department.controller"));

var _staff = _interopRequireDefault(require("./staff.controller"));

var _patient = _interopRequireDefault(require("./patient.controller"));

var _price = _interopRequireDefault(require("./price.controller"));

var _healthinsurance = _interopRequireDefault(require("./healthinsurance.controller"));

var _lab = _interopRequireDefault(require("./lab.controller"));