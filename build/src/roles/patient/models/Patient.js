"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var PatientSchema = new _mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  residentAddress: {
    type: String,
    required: true
  },
  officeAddress: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: false
  },
  nextOfKin: {
    type: String,
    required: true
  },
  hospital: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true
  },
  password: {
    type: String,
    required: true
  },
  activeStatus: {
    type: Number,
    "default": 0
  },
  isBoarded: {
    type: Number,
    "default": 0
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)("Patient", PatientSchema);

exports["default"] = _default;