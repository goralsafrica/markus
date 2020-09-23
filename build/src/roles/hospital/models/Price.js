"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Price = exports.Currency = void 0;

var _mongoose = require("mongoose");

var Currency = (0, _mongoose.model)("Currency", new _mongoose.Schema({
  symbol: {
    type: String,
    required: true
  },
  words: {
    type: String,
    required: true
  }
}));
exports.Currency = Currency;
var Price = (0, _mongoose.model)("Price", new _mongoose.Schema({
  hospital: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  // currency: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Currency",
  // },
  currency: {
    type: String
  }
}, {
  timestamps: true
}));
exports.Price = Price;