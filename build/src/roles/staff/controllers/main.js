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

var _Staff = _interopRequireDefault(require("../models/Staff"));

var _StaffCategory = _interopRequireDefault(require("../models/StaffCategory"));

var StaffController = /*#__PURE__*/function () {
  function StaffController() {
    (0, _classCallCheck2["default"])(this, StaffController);
  }

  (0, _createClass2["default"])(StaffController, null, [{
    key: "getDetails",
    value: function () {
      var _getDetails = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var data;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _Staff["default"].findById(req.credentials.staff).populate("branches").populate("department").populate("role").populate({
                  path: "role",
                  populate: {
                    path: "category",
                    model: "StaffCategory"
                  }
                }).populate("hospital") // .populate({
                //   path: 'administrative'
                // });
                .populate("administrativeRole.name administrativeRole.branch administrativeRole.department");

              case 3:
                data = _context.sent;
                res.json({
                  data: data,
                  errors: null,
                  message: "staff details retrieved"
                });
                _context.next = 11;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                console.error(_context.t0);
                return _context.abrupt("return", next([500, ["server failed to respond"], "failed request"]));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function getDetails(_x, _x2, _x3) {
        return _getDetails.apply(this, arguments);
      }

      return getDetails;
    }()
  }, {
    key: "sendResignationLetter",
    value: function () {
      var _sendResignationLetter = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log("done");

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function sendResignationLetter(_x4, _x5, _x6) {
        return _sendResignationLetter.apply(this, arguments);
      }

      return sendResignationLetter;
    }()
  }]);
  return StaffController;
}();

var _default = StaffController;
exports["default"] = _default;