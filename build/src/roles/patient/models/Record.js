"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _default = (0, _mongoose.model)("Record", new _mongoose.Schema({
  patient: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  }
}));

exports["default"] = _default;