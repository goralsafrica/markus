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

var _HospitalRoster = _interopRequireDefault(require("../model/HospitalRoster"));

var _utilities = require("../../utilities");

var RosterController = /*#__PURE__*/function () {
  function RosterController() {
    (0, _classCallCheck2["default"])(this, RosterController);
  }

  (0, _createClass2["default"])(RosterController, null, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var credentials, body, roster, newRoster;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                credentials = _ref.credentials, body = _ref.body;
                body.hospital = credentials.hospital;
                roster = {};
                roster.monday = {}; // roster.monday[body.hospital] = [body.hospital, body.hospital];

                body.roster = roster;
                _context.prev = 5;
                newRoster = new _HospitalRoster["default"](body);
                newRoster.roster.monday.set(body.hospital, "emeka");
                _context.next = 10;
                return newRoster.save();

              case 10:
                if (!_context.sent) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", (0, _utilities.successMessage)(newRoster, "hospital roster has been created"));

              case 12:
                _context.next = 18;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](5);
                console.log(_context.t0);
                return _context.abrupt("return", (0, _utilities.serverError)({
                  request: "request failure"
                }, "failed to create hospital roster"));

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 14]]);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "findOne",
    value: function () {
      var _findOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2) {
        var hospital, roster;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                hospital = _ref2.hospital;
                _context2.prev = 1;
                _context2.next = 4;
                return _HospitalRoster["default"].find({
                  hospital: hospital
                });

              case 4:
                roster = _context2.sent;
                return _context2.abrupt("return", {
                  status: 200,
                  result: {
                    data: roster,
                    errors: null,
                    message: "hospital roster retrieved"
                  }
                });

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                console.error(_context2.t0);
                return _context2.abrupt("return", (0, _utilities.serverError)({
                  request: "invalid hospital id"
                }, "failed to fetch hospital roster"));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 8]]);
      }));

      function findOne(_x2) {
        return _findOne.apply(this, arguments);
      }

      return findOne;
    }()
  }]);
  return RosterController;
}();

var _default = RosterController;
exports["default"] = _default;