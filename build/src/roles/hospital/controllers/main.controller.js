"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Hospital = _interopRequireDefault(require("../models/Hospital"));

var _Staff = _interopRequireDefault(require("../../staff/models/Staff"));

var _bcryptjs = require("bcryptjs");

var _utilities = require("../../../utilities");

/**
 * @description Controller for all hospital - admin functions
 */
var HospitalController = /*#__PURE__*/function () {
  function HospitalController() {
    (0, _classCallCheck2["default"])(this, HospitalController);
  }

  (0, _createClass2["default"])(HospitalController, null, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
        var createHospital, createStaff, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // hash password
                user.password = (0, _bcryptjs.hashSync)(user.password, 10);
                _context.prev = 1;
                _context.next = 4;
                return _Hospital["default"].create({
                  name: user.hospitalName,
                  email: user.hospitalEmail,
                  phone: user.hospitalPhone,
                  url: user.url,
                  code: user.hospitalCode
                });

              case 4:
                createHospital = _context.sent;
                _context.next = 7;
                return _Staff["default"].create({
                  firstName: user.adminFirstName,
                  lastName: user.adminLastName,
                  email: user.adminEmail,
                  phone: user.adminPhone,
                  department: "5f5f2e592efb0a2bc448d5c4",
                  role: "5f5b6c7cbecfefabaefe913f",
                  hospital: createHospital._id,
                  password: user.password,
                  priviledged: 1
                });

              case 7:
                createStaff = _context.sent;

                if (!(!createHospital || !createStaff)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", Promise.reject("error"));

              case 10:
                token = (0, _utilities.deriveToken)(createHospital._id, createStaff._id);
                return _context.abrupt("return", Promise.resolve({
                  status: 200,
                  result: {
                    data: {
                      token: token
                    },
                    errors: null,
                    message: "hospital has been created successfully"
                  }
                }));

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](1);
                console.error(_context.t0);
                return _context.abrupt("return", Promise.resolve((0, _utilities.serverError)({
                  request: "server failed to respond"
                }, "failed to create new hospital")));

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 14]]);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "findOne",
    value: function () {
      var _findOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref) {
        var hospital, staff, data;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                hospital = _ref.hospital, staff = _ref.staff;
                _context2.prev = 1;
                _context2.next = 4;
                return _Hospital["default"].findById(hospital);

              case 4:
                data = _context2.sent;

                if (data) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", Promise.resolve((0, _utilities.badRequestError)({
                  hospital: "invalid hospital id"
                }, "failed to fetch hospital")));

              case 7:
                return _context2.abrupt("return", Promise.resolve({
                  status: 200,
                  result: {
                    data: data,
                    errors: null,
                    message: "hospital found"
                  }
                }));

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", Promise.resolve((0, _utilities.serverError)({
                  request: "server failed to respond"
                }, "failed to fetch hospital")));

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 10]]);
      }));

      function findOne(_x2) {
        return _findOne.apply(this, arguments);
      }

      return findOne;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref2) {
        var body, credentials, data;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                body = _ref2.body, credentials = _ref2.credentials;
                _context3.prev = 1;
                _context3.next = 4;
                return _Hospital["default"].findByIdAndUpdate(credentials.hospital, {
                  email: body.email,
                  name: body.name,
                  phone: body.phone
                }, {
                  "new": true
                });

              case 4:
                data = _context3.sent;

                if (data) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", Promise.reject("error handling request"));

              case 7:
                return _context3.abrupt("return", {
                  status: 200,
                  result: {
                    data: data,
                    errors: null,
                    message: "hospital details have been successfully updated"
                  }
                });

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](1);
                console.error(_context3.t0);
                return _context3.abrupt("return", (0, _utilities.serverError)({
                  request: "server failed to respond"
                }, "failed to update hospital data"));

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 10]]);
      }));

      function update(_x3) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }]);
  return HospitalController;
}();

var _default = HospitalController;
exports["default"] = _default;