"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var RolesSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "StaffCategory"
  }
});

var _default = (0, _mongoose.model)("Role", RolesSchema);

exports["default"] = _default;