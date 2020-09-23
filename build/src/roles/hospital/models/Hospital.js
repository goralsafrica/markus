"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

//preferred workspace url
var hospitalSchema = (0, _mongoose.Schema)({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  url: {
    type: String,
    unique: true
  },
  code: {
    type: String,
    unique: true,
    required: true
  },
  departments: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Department"
  }]
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)("Hospital", hospitalSchema);

exports["default"] = _default;