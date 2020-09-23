"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var branchSchema = (0, _mongoose.Schema)({
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  hospital: {
    required: true,
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Hospital"
  },
  departments: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Department"
  }]
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)("Branch", branchSchema);

exports["default"] = _default;