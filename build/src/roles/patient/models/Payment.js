"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var PaymentSchema = new _mongoose.Schema({
  patient: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },
  amountPaid: {
    type: Number,
    required: true
  },
  amountDue: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)("Payment", PaymentSchema);

exports["default"] = _default;