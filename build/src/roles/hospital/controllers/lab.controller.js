"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Lab = _interopRequireDefault(require("../models/Lab"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var HospitalLabController = /*#__PURE__*/function () {
  function HospitalLabController() {
    (0, _classCallCheck2["default"])(this, HospitalLabController);
  }

  (0, _createClass2["default"])(HospitalLabController, null, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var hospital, lab;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                hospital = req.credentials.hospital;
                lab = _objectSpread(_objectSpread({}, req.body), {}, {
                  hospital: hospital
                });
                _context.prev = 2;
                _context.next = 5;
                return _Lab["default"].create(lab);

              case 5:
                lab = _context.sent;
                res.send({
                  data: lab,
                  errors: null,
                  message: "hospital external labs list updated"
                });
                _context.next = 13;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](2);
                console.log(_context.t0);
                return _context.abrupt("return", next([500, ["server failed to respond"], "failed to update hospital labs"]));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 9]]);
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
        var hospital, labs;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                hospital = req.credentials.hospital;
                _context2.prev = 1;
                _context2.next = 4;
                return _Lab["default"].find({
                  hospital: hospital
                });

              case 4:
                labs = _context2.sent;
                res.send({
                  data: labs,
                  errors: null,
                  message: "hospital labs list retrieved"
                });
                _context2.next = 12;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                console.log(_context2.t0);
                return _context2.abrupt("return", next([500, ["server failed to respond"], "failed to retrieve lab list"]));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 8]]);
      }));

      function findAll(_x4, _x5, _x6) {
        return _findAll.apply(this, arguments);
      }

      return findAll;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
        var lab;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _Lab["default"].findByIdAndUpdate(req.params.labid, _objectSpread({}, req.body), {
                  "new": true,
                  useFindAndModify: false
                });

              case 3:
                lab = _context3.sent;
                res.send({
                  data: lab,
                  errs: null,
                  message: "hospital lab has been updated"
                });
                _context3.next = 11;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                console.log(_context3.t0);
                return _context3.abrupt("return", next([500, ["server failed to respond"], "failed to update hospital lab"]));

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      function update(_x7, _x8, _x9) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
        var lab;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _Lab["default"].findByIdAndDelete(req.params.labid, {
                  useFindAndModify: false
                });

              case 3:
                lab = _context4.sent;
                res.send({
                  data: lab,
                  errors: null,
                  message: "hospital lab list has been updated"
                });
                _context4.next = 11;
                break;

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                console.log(_context4.t0);
                return _context4.abrupt("return", next([500, ["server failed to respond"], "failed to update hospital lab list"]));

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 7]]);
      }));

      function _delete(_x10, _x11, _x12) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return HospitalLabController;
}();

var _default = HospitalLabController;
exports["default"] = _default;