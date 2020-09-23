"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var StaffCategorySchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

var _default = (0, _mongoose.model)("StaffCategory", StaffCategorySchema);

exports["default"] = _default;