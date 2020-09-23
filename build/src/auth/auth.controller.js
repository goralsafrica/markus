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

var _bcryptjs = require("bcryptjs");

var _Hospital = _interopRequireDefault(require("../roles/hospital/models/Hospital"));

var _Patient = _interopRequireDefault(require("../roles/patient/models/Patient"));

var _Staff = _interopRequireDefault(require("../roles/staff/models/Staff"));

var _utilities = require("../utilities");

var AuthController = /*#__PURE__*/function () {
  function AuthController() {
    (0, _classCallCheck2["default"])(this, AuthController);
  }

  (0, _createClass2["default"])(AuthController, null, [{
    key: "login",
    value: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
        var email, password, hospital, staff, correctPassword, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log(user);
                email = user.code, password = user.password, hospital = user.hospital;
                _context.prev = 2;
                _context.next = 5;
                return _Staff["default"].findOne({
                  email: email,
                  hospital: hospital
                }).select("+password");

              case 5:
                staff = _context.sent;

                if (staff) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", (0, _utilities.badRequestError)({
                  request: "no record mathches the provided credentials"
                }, "login failure"));

              case 8:
                _context.t0 = _bcryptjs.compare;
                _context.t1 = password;
                _context.next = 12;
                return staff.password;

              case 12:
                _context.t2 = _context.sent;
                _context.next = 15;
                return (0, _context.t0)(_context.t1, _context.t2);

              case 15:
                correctPassword = _context.sent;
                _context.next = 18;
                return correctPassword;

              case 18:
                if (_context.sent) {
                  _context.next = 20;
                  break;
                }

                return _context.abrupt("return", (0, _utilities.badRequestError)({
                  request: "invalid login credentials"
                }, "login failure"));

              case 20:
                token = (0, _utilities.deriveToken)(hospital, staff._id); //arrange data to be sent back

                return _context.abrupt("return", {
                  status: 200,
                  result: {
                    data: {
                      firstName: staff.firstName,
                      lastName: staff.lastName,
                      email: staff.email,
                      token: token
                    },
                    errors: null,
                    message: "login successful"
                  }
                });

              case 24:
                _context.prev = 24;
                _context.t3 = _context["catch"](2);
                console.error("here", _context.t3);
                return _context.abrupt("return", (0, _utilities.serverError)(_context.t3, "failed to log user in"));

              case 28:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 24]]);
      }));

      function login(_x) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "verifyWorkspace",
    value: function () {
      var _verifyWorkspace = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(url) {
        var hospital;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _Hospital["default"].findOne({
                  url: url
                });

              case 3:
                hospital = _context2.sent;

                if (hospital) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", (0, _utilities.badRequestError)({
                  url: "url not found"
                }, "failed to login to workspace"));

              case 6:
                return _context2.abrupt("return", (0, _utilities.successMessage)({
                  hospital: hospital._id
                }, "workspace validation passed"));

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                console.error(_context2.t0);
                return _context2.abrupt("return", (0, _utilities.serverError)({
                  request: "server failed to respond"
                }, "failed to login to workspace"));

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }));

      function verifyWorkspace(_x2) {
        return _verifyWorkspace.apply(this, arguments);
      }

      return verifyWorkspace;
    }()
  }]);
  return AuthController;
}();

var _default = AuthController;
exports["default"] = _default;