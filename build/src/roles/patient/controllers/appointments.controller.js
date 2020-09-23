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

var _Appointment = _interopRequireDefault(require("../models/Appointment"));

var PatientAppointmentsController = /*#__PURE__*/function () {
  function PatientAppointmentsController() {
    (0, _classCallCheck2["default"])(this, PatientAppointmentsController);
  }

  (0, _createClass2["default"])(PatientAppointmentsController, null, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var patient, data;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                patient = req.credentials.patient;
                _context.prev = 1;
                _context.next = 4;
                return _Appointment["default"].create(req.body);

              case 4:
                data = _context.sent;
                res.send({
                  data: data,
                  errors: null,
                  message: "your appointment has been scheduled"
                });
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                next(500, ["server failed to respond"], "failed to perform request");

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 8]]);
      }));

      function create(_x, _x2, _x3) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "getDetails",
    value: function () {
      var _getDetails = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
        var patient, data;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                patient = req.credentials.patient;
                _context2.prev = 1;
                _context2.next = 4;
                return Patient.findById(patient);

              case 4:
                data = _context2.sent;
                res.send({
                  data: data,
                  errors: null,
                  message: "your details have been retrieved"
                });
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                next(500, ["server failed to respond"], "failed to perform request");

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 8]]);
      }));

      function getDetails(_x4, _x5, _x6) {
        return _getDetails.apply(this, arguments);
      }

      return getDetails;
    }()
  }, {
    key: "findAll",
    value: function () {
      var _findAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
        var patient, data;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                patient = req.credentials.patient;
                _context3.prev = 1;
                _context3.next = 4;
                return _Appointment["default"].find({
                  patient: patient
                });

              case 4:
                data = _context3.sent;
                res.send({
                  data: data,
                  errors: null,
                  message: "your scheduled appointmens have been retrieved"
                });
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](1);
                next(500, ["server failed to respond"], "failed to perform request");

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 8]]);
      }));

      function findAll(_x7, _x8, _x9) {
        return _findAll.apply(this, arguments);
      }

      return findAll;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
        var patient, data;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                patient = req.credentials.patient;
                _context4.prev = 1;
                _context4.next = 4;
                return Payment.find({
                  patient: patient
                });

              case 4:
                data = _context4.sent;
                res.send({
                  data: data,
                  errors: null,
                  message: "your appointment has been rescheduled"
                });
                _context4.next = 11;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](1);
                next(500, ["server failed to respond"], "failed to perform request");

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 8]]);
      }));

      function update(_x10, _x11, _x12) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "confirm",
    value: function () {
      var _confirm = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
        var patient, data;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                patient = req.credentials.patient;
                _context5.prev = 1;
                _context5.next = 4;
                return Apartment.findByIdAndUpdate({
                  patient: patient
                }, {
                  finalized: 1
                });

              case 4:
                data = _context5.sent;
                res.send({
                  data: data,
                  errors: null,
                  message: "your appointment has been confirmed"
                });
                _context5.next = 11;
                break;

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](1);
                next(500, ["server failed to respond"], "failed to perform request");

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 8]]);
      }));

      function confirm(_x13, _x14, _x15) {
        return _confirm.apply(this, arguments);
      }

      return confirm;
    }()
  }]);
  return PatientAppointmentsController;
}();

var _default = PatientAppointmentsController;
exports["default"] = _default;