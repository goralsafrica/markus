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

var _Department = _interopRequireDefault(require("../models/Department"));

var DepartmentController = /*#__PURE__*/function () {
  function DepartmentController() {
    (0, _classCallCheck2["default"])(this, DepartmentController);
  }

  (0, _createClass2["default"])(DepartmentController, null, [{
    key: "getDetails",
    value: function () {
      var _getDetails = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var _req$staff$administra, branch, department, staffInDepartment;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$staff$administra = req.staff.administrativeRole, branch = _req$staff$administra.branch, department = _req$staff$administra.department;
                _context.prev = 1;
                _context.next = 4;
                return _Staff["default"].find({
                  branches: {
                    $in: [branch._id]
                  }
                });

              case 4:
                staffInDepartment = _context.sent;
                console.log(staffInDepartment);
                res.json({
                  data: {
                    branch: branch,
                    department: department,
                    staffInDepartment: staffInDepartment
                  },
                  errors: null,
                  message: "department details retrieved"
                });
                _context.next = 13;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);
                console.error(_context.t0);
                return _context.abrupt("return", next([500, ["server failed to respond"], "failed request"]));

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
  return DepartmentController;
}();

var _default = DepartmentController;
exports["default"] = _default;