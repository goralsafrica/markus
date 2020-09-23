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

var _Patient = _interopRequireDefault(require("../../patient/models/Patient"));

var _Record = _interopRequireDefault(require("../../patient/models/Record"));

var HospitalPatientController = /*#__PURE__*/function () {
  function HospitalPatientController() {
    (0, _classCallCheck2["default"])(this, HospitalPatientController);
  }

  (0, _createClass2["default"])(HospitalPatientController, null, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                try {} catch (err) {}

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function create(_x, _x2, _x3) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "findAll",
    value: function () {
      var _findAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
        var data;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _Patient["default"].find({
                  hospital: req.credentials.hospital
                });

              case 3:
                data = _context2.sent;
                res.send({
                  data: data,
                  errors: null,
                  mesaage: "registered patients found"
                });
                _context2.next = 11;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);
                next([500, ["server  failed to respond :("], "failed to create branch"]);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }));

      function findAll(_x4, _x5, _x6) {
        return _findAll.apply(this, arguments);
      }

      return findAll;
    }()
  }, {
    key: "findOne",
    value: function () {
      var _findOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
        var data;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _Patient["default"].findById(req.params.patientid);

              case 3:
                data = _context3.sent;

                if (data) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", next(400, ["patient not found"], "bad request"));

              case 6:
                _context3.next = 8;
                return _Record["default"].find({
                  patient: req.params.patientid
                });

              case 8:
                data.records = _context3.sent;
                res.json({
                  data: data,
                  errors: null,
                  message: "patients records retrieved"
                });
                _context3.next = 16;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](0);
                console.log(_context3.t0);
                next([500, ["server  failed to respond :("], "failed to create branch"]);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 12]]);
      }));

      function findOne(_x7, _x8, _x9) {
        return _findOne.apply(this, arguments);
      }

      return findOne;
    }()
  }]);
  return HospitalPatientController;
}();

var _default = HospitalPatientController;
exports["default"] = _default;