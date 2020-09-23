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

var DepartmentStaffController = /*#__PURE__*/function () {
  function DepartmentStaffController() {
    (0, _classCallCheck2["default"])(this, DepartmentStaffController);
  }

  (0, _createClass2["default"])(DepartmentStaffController, null, [{
    key: "getStaff",
    value: function () {
      var _getStaff = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var _req$staff$administra, branch, department, data;

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
                  },
                  department: department._id,
                  _id: req.params.id
                });

              case 4:
                data = _context.sent;
                res.json({
                  data: data,
                  errors: null,
                  message: "department staff details retrieved"
                });
                _context.next = 12;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                console.error(_context.t0);
                return _context.abrupt("return", next([500, ["server failed to respond"], "failed request"]));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 8]]);
      }));

      function getStaff(_x, _x2, _x3) {
        return _getStaff.apply(this, arguments);
      }

      return getStaff;
    }()
  }, {
    key: "updateStaff",
    value: function () {
      var _updateStaff = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
        var _req$staff$administra2, branch, department, staff;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$staff$administra2 = req.staff.administrativeRole, branch = _req$staff$administra2.branch, department = _req$staff$administra2.department;
                _context2.prev = 1;
                _context2.next = 4;
                return _Staff["default"].find({
                  branches: {
                    $in: [branch._id]
                  },
                  department: department._id,
                  _id: req.params.id
                });

              case 4:
                staff = _context2.sent;
                staff.department = req.body.department;
                _context2.next = 8;
                return staff.save();

              case 8:
                staff = _context2.sent;
                res.json({
                  data: staff,
                  errors: null,
                  message: "staff department has been successfully updated"
                });
                _context2.next = 16;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](1);
                console.error(_context2.t0);
                return _context2.abrupt("return", next([500, ["server failed to respond"], "failed request"]));

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 12]]);
      }));

      function updateStaff(_x4, _x5, _x6) {
        return _updateStaff.apply(this, arguments);
      }

      return updateStaff;
    }()
  }]);
  return DepartmentStaffController;
}();

var _default = DepartmentStaffController;
exports["default"] = _default;