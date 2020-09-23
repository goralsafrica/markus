"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deriveToken = deriveToken;
exports.verifyToken = verifyToken;
exports.serverError = serverError;
exports.badRequestError = badRequestError;
exports.successMessage = successMessage;
exports.sanitize = sanitize;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var config = _interopRequireWildcard(require("../config"));

function deriveToken(hospital, staff) {
  return _jsonwebtoken["default"].sign({
    hospital: hospital,
    staff: staff
  }, config.secretKey);
}

function verifyToken(payload) {
  return _jsonwebtoken["default"].verify(payload, process.env.SECRET_KEY);
}
/**
 *
 * @param {} errors object containing the errors
 * @param {String} message summarized error message
 */


function serverError(error, message) {
  return {
    status: 500,
    result: {
      data: null,
      errors: {
        request: error
      },
      message: message
    }
  };
}
/**
 *
 * @param {Object} errors object containing the errors
 * @param {String} message summarized error message
 */


function badRequestError(errors, message) {
  return {
    status: 400,
    result: {
      data: null,
      errors: errors,
      message: message
    }
  };
}
/**
 *
 * @param {} data object containing the data
 * @param {String} message summarized success  message
 */


function successMessage(data, message) {
  return {
    status: 200,
    result: {
      data: data,
      errors: null,
      message: message
    }
  };
}

function sanitize(validator, data) {
  for (var prop in data) {
    data[prop] = validator.trim(data[prop]);
    data[prop] = validator.escape(data[prop]);
  }

  return data;
}