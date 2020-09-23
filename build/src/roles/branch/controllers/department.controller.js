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

var _Department = _interopRequireDefault(require("../../department/models/Department"));

var BranchDepartmentController = /*#__PURE__*/function () {
  function BranchDepartmentController() {
    (0, _classCallCheck2["default"])(this, BranchDepartmentController);
  }

  (0, _createClass2["default"])(BranchDepartmentController, null, [{
    key: "add",
    value: function () {
      var _add = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var branch, data, index;
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

                if (data) {
                  _context.next = 7;
                  break;
                }

                throw new Error("400");

              case 7:
                index = data.departments.findIndex(function (d) {
                  return d == req.body.department;
                });
                if (index == -1) data.departments.push(req.body.department);
                _context.next = 11;
                return data.save();

              case 11:
                res.json({
                  data: data,
                  errors: null,
                  message: "department has been added"
                });
                _context.next = 18;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](1);
                console.log(_context.t0);
                next([500, ["server  failed to respond :("], "failed to add new department"]);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 14]]);
      }));

      function add(_x, _x2, _x3) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "getDepartments",
    value: function () {
      var _getDepartments = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
        var branch, data;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                branch = req.staff.administrativeRole.branch;
                _context2.prev = 1;
                _context2.next = 4;
                return _Branch["default"].findById(branch._id).select("departments").populate("departments");

              case 4:
                data = _context2.sent;
                if (!data) next([400, ["invalid branch id"], "departments not found"]);
                res.send({
                  data: data,
                  errors: null,
                  message: "branch department list retireved"
                });
                _context2.next = 13;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](1);
                console.log(_context2.t0);
                next([500, ["server  failed to respond :("], "failed to retrieve list"]);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 9]]);
      }));

      function getDepartments(_x4, _x5, _x6) {
        return _getDepartments.apply(this, arguments);
      }

      return getDepartments;
    }()
  }, {
    key: "getDepartment",
    value: function () {
      var _getDepartment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
        var branch, details, staff, data;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                branch = req.staff.administrativeRole.branch;
                _context3.prev = 1;
                _context3.next = 4;
                return _Department["default"].findById(req.params.departmentid).select("name");

              case 4:
                details = _context3.sent;
                console.log(details);
                _context3.next = 8;
                return _Staff["default"].find({
                  branches: {
                    $in: [branch._id]
                  },
                  department: req.params.departmentid
                }).populate({
                  path: "role",
                  model: "Role",
                  populate: {
                    path: "category",
                    model: "StaffCategory"
                  }
                });

              case 8:
                staff = _context3.sent;
                data = {
                  details: details,
                  staff: staff
                };

                if (data) {
                  _context3.next = 12;
                  break;
                }

                throw new Error("failed");

              case 12:
                res.send({
                  data: data,
                  errors: null,
                  message: "branch department list retireved"
                });
                _context3.next = 19;
                break;

              case 15:
                _context3.prev = 15;
                _context3.t0 = _context3["catch"](1);
                console.log(_context3.t0);
                next([500, ["server  failed to respond :("], "failed to retrieve details"]);

              case 19:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 15]]);
      }));

      function getDepartment(_x7, _x8, _x9) {
        return _getDepartment.apply(this, arguments);
      }

      return getDepartment;
    }()
  }, {
    key: "removeDepartment",
    value: function () {
      var _removeDepartment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
        var branch, data;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                branch = req.staff.administrativeRole.branch;
                _context4.prev = 1;
                _context4.next = 4;
                return _Branch["default"].findById(branch._id);

              case 4:
                data = _context4.sent;
                data.departments = data.departments.filter(function (d) {
                  return d != req.params.departmentid;
                });
                _context4.next = 8;
                return data.save();

              case 8:
                if (_context4.sent) {
                  _context4.next = 10;
                  break;
                }

                throw new Error("error o");

              case 10:
                res.send({
                  data: data,
                  errors: null,
                  message: "department has been successfully removed from branch"
                });
                _context4.next = 17;
                break;

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](1);
                console.log(_context4.t0);
                next([500, ["server  failed to respond :("], "failed to remove department"]);

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 13]]);
      }));

      function removeDepartment(_x10, _x11, _x12) {
        return _removeDepartment.apply(this, arguments);
      }

      return removeDepartment;
    }()
  }]);
  return BranchDepartmentController;
}();

var _default = BranchDepartmentController;
exports["default"] = _default;