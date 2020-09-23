"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.secretKey = exports.dbURI = exports.port = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)(".env");
var _process$env = process.env,
    MONGO_TEST_URI = _process$env.MONGO_TEST_URI,
    MONGO_DEV_URI = _process$env.MONGO_DEV_URI,
    SECRET_KEY = _process$env.SECRET_KEY;
var port = process.env.PORT || 8000;
exports.port = port;
var dbURI = process.env.NODE_ENV == "development" ? MONGO_DEV_URI : MONGO_TEST_URI;
exports.dbURI = dbURI;
var secretKey = SECRET_KEY;
exports.secretKey = secretKey;