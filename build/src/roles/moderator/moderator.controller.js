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

var _Hospital = _interopRequireDefault(require("../hospital/models/Hospital"));

var moderatorController = /*#__PURE__*/function () {
  function moderatorController() {
    (0, _classCallCheck2["default"])(this, moderatorController);
  }

  (0, _createClass2["default"])(moderatorController, null, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var data;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _Hospital["default"].find();

              case 3:
                data = _context.sent;
                res.json({
                  data: data,
                  errors: null,
                  message: "list of hospitals retrieved"
                });
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                next([500, ["Internal Server error... please try again later"], "server  failed to respond :("]);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function index(_x, _x2, _x3) {
        return _index.apply(this, arguments);
      }

      return index;
    }()
  }, {
    key: "show",
    value: function () {
      var _show = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
        var data;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (req.params.id) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", next(400, ["hospital id required"], "invalid request"));

              case 2:
                _context2.prev = 2;
                _context2.next = 5;
                return _Hospital["default"].findById(req.params.id);

              case 5:
                data = _context2.sent;
                res.json({
                  data: data,
                  errors: null,
                  message: "Hospital found"
                });
                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](2);
                next([500, ["Internal Server error... please try again later"], "server  failed to respond :("]);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 9]]);
      }));

      function show(_x4, _x5, _x6) {
        return _show.apply(this, arguments);
      }

      return show;
    }()
  }]);
  return moderatorController;
}();

var _default = moderatorController;
exports["default"] = _default;