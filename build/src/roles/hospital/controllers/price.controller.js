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

var _Price = require("../models/Price");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var HospitalPriceController = /*#__PURE__*/function () {
  function HospitalPriceController() {
    (0, _classCallCheck2["default"])(this, HospitalPriceController);
  }

  (0, _createClass2["default"])(HospitalPriceController, null, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var hospital, pricing, newPrice;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                hospital = req.credentials.hospital;
                pricing = _objectSpread(_objectSpread({}, req.body), {}, {
                  hospital: hospital
                });
                _context.prev = 2;
                _context.next = 5;
                return _Price.Price.create(pricing);

              case 5:
                newPrice = _context.sent;
                res.send({
                  data: newPrice,
                  errors: null,
                  message: "hospital price list updated"
                });
                _context.next = 13;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](2);
                console.log(error);
                return _context.abrupt("return", next([500, ["server failed to respond"], "failed to add price category"]));

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
        var hospital, priceList;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                hospital = req.credentials.hospital;
                _context2.prev = 1;
                _context2.next = 4;
                return _Price.Price.find({
                  hospital: hospital
                });

              case 4:
                priceList = _context2.sent;
                res.send({
                  data: priceList,
                  errors: null,
                  message: "hospital price list retrieved"
                });
                _context2.next = 12;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                console.log(error);
                return _context2.abrupt("return", next([500, ["server failed to respond"], "failed to retrieve hospital price list"]));

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
        var priceList;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _Price.Price.findByIdAndUpdate(req.params.priceid, _objectSpread({}, req.body), {
                  "new": true
                });

              case 3:
                priceList = _context3.sent;
                res.send({
                  data: priceList,
                  errors: null,
                  message: "hospital price list has been updated"
                });
                _context3.next = 11;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                console.log(error);
                return _context3.abrupt("return", next([500, ["server failed to respond"], "failed to update hospital price list"]));

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
        var priceList;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _Price.Price.findByIdAndDelete(req.params.priceid);

              case 3:
                priceList = _context4.sent;
                res.send({
                  data: priceList,
                  errors: null,
                  message: "hospital price list has been updated"
                });
                _context4.next = 11;
                break;

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                console.log(error);
                return _context4.abrupt("return", next([500, ["server failed to respond"], "failed to update hospital price list"]));

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
  return HospitalPriceController;
}();

var _default = HospitalPriceController;
exports["default"] = _default;