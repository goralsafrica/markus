"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loader;

var _database = _interopRequireDefault(require("./database"));

var _routes = _interopRequireDefault(require("./routes"));

function loader(app, config) {
  return (0, _database["default"])(app, config).then((0, _routes["default"])(app, config)).then(function () {
    return Promise.resolve("resources have been loaded successfully");
  })["catch"](function (err) {
    console.log(err);
    process.exit();
  });
}