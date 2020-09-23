"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _http = require("http");

var _loaders = _interopRequireDefault(require("./loaders"));

var config = _interopRequireWildcard(require("./config"));

var app = (0, _express["default"])();
(0, _loaders["default"])(app, config).then(function (msg) {
  console.log(msg);
  var port = config.port;
  var server = (0, _http.createServer)(app);
  server.listen(port, function () {
    return console.log("server running on port ".concat(port));
  });
})["catch"](function (err) {
  console.error(err);
  process.exit(1);
});
var _default = app;
exports["default"] = _default;