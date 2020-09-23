"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _mongoose = require("mongoose");

function _default(app, _ref) {
  var dbURI = _ref.dbURI;
  return (0, _mongoose.connect)(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
}