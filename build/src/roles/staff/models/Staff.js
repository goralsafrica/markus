"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var AdministrativeRoleSchema = new _mongoose.Schema({
  name: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Role"
  },
  branch: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Branch"
  },
  department: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Department"
  }
});
var StaffSchema = new _mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  hospital: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  priviledged: {
    type: Number,
    "default": 0
  },
  administrativeRole: {
    type: AdministrativeRoleSchema,
    required: false
  },
  role: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Role"
  },
  department: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: false
  },
  branches: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Branch"
  }]
});

var _default = (0, _mongoose.model)("Staff", StaffSchema);

exports["default"] = _default;