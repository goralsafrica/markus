"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var DepartmentSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)("Department", DepartmentSchema);

exports["default"] = _default;