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

var _Patient = _interopRequireDefault(require("../models/Patient"));

var _Record = _interopRequireDefault(require("../models/Record"));

var _Payment = _interopRequireDefault(require("../models/Payment"));

var MainPatientController = /*#__PURE__*/function () {
  function MainPatientController() {
    (0, _classCallCheck2["default"])(this, MainPatientController);
  }

  (0, _createClass2["default"])(MainPatientController, null, [{
    key: "getDetails",
    value: function () {
      var _getDetails = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var patient, data;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                patient = req.credentials.patient;
                _context.prev = 1;
                _context.next = 4;
                return _Patient["default"].findById(patient);

              case 4:
                data = _context.sent;
                res.send({
                  data: data,
                  errors: null,
                  message: "your details have been retrieved"
                });
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                next(500, ["server failed to respons"], "failed to retrieve your details");

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 8]]);
      }));

      function getDetails(_x, _x2, _x3) {
        return _getDetails.apply(this, arguments);
      }

      return getDetails;
    }()
  }, {
    key: "getRecords",
    value: function () {
      var _getRecords = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
        var patient, data;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                patient = req.credentials.patient;
                _context2.prev = 1;
                _context2.next = 4;
                return _Record["default"].find({
                  patient: patient
                });

              case 4:
                data = _context2.sent;
                res.send({
                  data: data,
                  errors: null,
                  message: "your records have been retrieved"
                });
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                next(500, ["server failed to respons"], "failed to retrieve your details");

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 8]]);
      }));

      function getRecords(_x4, _x5, _x6) {
        return _getRecords.apply(this, arguments);
      }

      return getRecords;
    }()
  }, {
    key: "getPaymentHisory",
    value: function () {
      var _getPaymentHisory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
        var patient, data;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                patient = req.credentials.patient;
                _context3.prev = 1;
                _context3.next = 4;
                return _Payment["default"].find({
                  patient: patient
                });

              case 4:
                data = _context3.sent;
                res.send({
                  data: data,
                  errors: null,
                  message: "your records have been retrieved"
                });
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](1);
                next(500, ["server failed to respons"], "failed to retrieve your details");

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 8]]);
      }));

      function getPaymentHisory(_x7, _x8, _x9) {
        return _getPaymentHisory.apply(this, arguments);
      }

      return getPaymentHisory;
    }()
  }]);
  return MainPatientController;
}();

var _default = MainPatientController;
exports["default"] = _default;