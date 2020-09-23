"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var labSchema = (0, _mongoose.Schema)({
  hospital: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Hospital"
  },
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
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)("Lab", labSchema);

exports["default"] = _default;