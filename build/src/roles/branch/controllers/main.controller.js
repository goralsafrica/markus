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

var _Staff = _interopRequireDefault(require("../../staff/models/Staff"));

var _Hospital = _interopRequireDefault(require("../../hospital/models/Hospital"));

//import { hashSync } from "bcryptjs";
var BranchController = /*#__PURE__*/function () {
  function BranchController() {
    (0, _classCallCheck2["default"])(this, BranchController);
  }

  (0, _createClass2["default"])(BranchController, null, [{
    key: "getDetails",
    value: function () {
      var _getDetails = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var branch, data;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                branch = req.staff.administrativeRole.branch;
                _context.prev = 1;
                _context.next = 4;
                return _Branch["default"].findById(branch._id);

              case 4:
                data = _context.sent;
                if (!data) next([400, ["invalid branch id"], "branch not found"]);
                res.send({
                  data: data,
                  errors: null,
                  message: "branch details found"
                });
                _context.next = 13;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);
                console.log(_context.t0);
                next([500, "server  failed to respond :("]);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 9]]);
      }));

      function getDetails(_x, _x2, _x3) {
        return _getDetails.apply(this, arguments);
      }

      return getDetails;
    }()
  }]);
  return BranchController;
}();

var _default = BranchController;
exports["default"] = _default;