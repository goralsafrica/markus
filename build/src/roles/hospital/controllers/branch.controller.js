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

var _Branch = _interopRequireDefault(require("../../branch/models/Branch"));

var _Hospital = _interopRequireDefault(require("../models/Hospital"));

//import { hashSync } from "bcryptjs";
var HospitalBranchController = /*#__PURE__*/function () {
  function HospitalBranchController() {
    (0, _classCallCheck2["default"])(this, HospitalBranchController);
  }

  (0, _createClass2["default"])(HospitalBranchController, null, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var _req$body, address, city, state, country, credentials, data;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, address = _req$body.address, city = _req$body.city, state = _req$body.state, country = _req$body.country, credentials = _req$body.credentials;
                _context.prev = 1;
                _context.next = 4;
                return _Branch["default"].create({
                  address: address,
                  city: city,
                  state: state,
                  country: country,
                  hospital: credentials.hospital
                });

              case 4:
                data = _context.sent;
                if (!data) next([400, ["invalid input data"], "failed to create hospital"]);
                res.send({
                  data: data,
                  errors: null,
                  mesaage: "new branch created"
                });
                _context.next = 13;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);
                console.log(_context.t0);
                next([500, ["server  failed to respond :("], "failed to create branch"]);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 9]]);
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
                return _Branch["default"].find({
                  hospital: req.body.credentials.hospital
                }).select("-hospital").populate("departments");

              case 3:
                data = _context2.sent;
                if (!data) next([400, ["invalid hospital id"], "branch(es) not found"]);
                res.send({
                  data: data
                });
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                next([500, "server  failed to respond :("]);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
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
                return _Branch["default"].findById(req.params.id).populate("departments");

              case 3:
                data = _context3.sent;
                if (!data) next([400, ["invalid branch id"], "branch not found"]);
                res.send({
                  data: data,
                  errors: null,
                  message: "branch found"
                });
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);
                next([500, "server  failed to respond :("]);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 8]]);
      }));

      function findOne(_x7, _x8, _x9) {
        return _findOne.apply(this, arguments);
      }

      return findOne;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
        var data;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _Branch["default"].findByIdAndUpdate(req.params.id, {
                  // address: req.body.address,
                  // landmark: req.body.landmark,
                  departments: req.body.departments
                }, {
                  "new": true,
                  useFindAndModify: false
                });

              case 3:
                data = _context4.sent;
                if (!data) next([400, ["invalid branch id"], "update failed"]);
                res.send({
                  data: data,
                  errors: null,
                  message: "branch has been successfully updated"
                });
                _context4.next = 12;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](0);
                console.error(_context4.t0);
                next([500, ["server failed to respond"], "server  failed to respond :("]);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 8]]);
      }));

      function update(_x10, _x11, _x12) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }]);
  return HospitalBranchController;
}();

var _default = HospitalBranchController;
exports["default"] = _default;