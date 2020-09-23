"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "branchValidator", {
  enumerable: true,
  get: function get() {
    return _inputs.registerBranchValidator;
  }
});
Object.defineProperty(exports, "registerValidator", {
  enumerable: true,
  get: function get() {
    return _inputs.registerValidator;
  }
});
Object.defineProperty(exports, "updateHospitalValidator", {
  enumerable: true,
  get: function get() {
    return _inputs.updateHospitalValidator;
  }
});
Object.defineProperty(exports, "verifyAdmin", {
  enumerable: true,
  get: function get() {
    return _auth.verifyAdmin;
  }
});
Object.defineProperty(exports, "verifyNewHospital", {
  enumerable: true,
  get: function get() {
    return _auth.verifyNewHospital;
  }
});
Object.defineProperty(exports, "generateCodes", {
  enumerable: true,
  get: function get() {
    return _utils.generateCodes;
  }
});

var _inputs = require("./inputs");

var _auth = require("./auth");

var _utils = require("./utils");