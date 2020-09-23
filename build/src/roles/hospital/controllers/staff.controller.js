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

var _Staff = _interopRequireDefault(require("../../staff/models/Staff"));

var _validator = _interopRequireDefault(require("validator"));

var _bcryptjs = require("bcryptjs");

var HospitalStaffController = /*#__PURE__*/function () {
  function HospitalStaffController() {
    (0, _classCallCheck2["default"])(this, HospitalStaffController);
  }

  (0, _createClass2["default"])(HospitalStaffController, null, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var _req$body, firstName, lastName, email, password, phone, branches, role, department, credentials, administrativeRole, hash, data;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password, phone = _req$body.phone, branches = _req$body.branches, role = _req$body.role, department = _req$body.department, credentials = _req$body.credentials, administrativeRole = _req$body.administrativeRole;
                _context.prev = 1;
                hash = (0, _bcryptjs.hashSync)(password, 10);
                _context.next = 5;
                return _Staff["default"].create({
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  password: hash,
                  phone: phone,
                  branches: branches,
                  department: department,
                  role: role,
                  administrativeRole: administrativeRole,
                  hospital: credentials.hospital
                });

              case 5:
                data = _context.sent;

                if (data) {
                  _context.next = 8;
                  break;
                }

                throw new Error("failed to update db");

              case 8:
                res.send({
                  data: data,
                  errors: null,
                  message: "new staff creation success !"
                });
                _context.next = 15;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](1);
                console.error(_context.t0);
                next([500, [_context.t0], "failed to create staff"]);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 11]]);
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
                return _Staff["default"].find({
                  hospital: req.body.credentials.hospital,
                  priviledged: 0
                }).select("-hospital").populate("department").populate("branches").populate("role", "-category");

              case 3:
                data = _context2.sent;
                res.send({
                  data: data,
                  errors: null,
                  message: "staff fetched"
                });
                _context2.next = 11;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                console.error(_context2.t0);
                next([500, ["failed to fetch"], "failed request"]);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
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
                return _Staff["default"].findById(req.params.id).populate("hospital", "+name -departments -branches -updatedAt").populate("department", "name").populate("role", "name").populate("branches", "-departments");

              case 3:
                data = _context3.sent;
                res.send({
                  data: data,
                  errors: null,
                  message: "staff fetched"
                });
                _context3.next = 11;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                console.error(_context3.t0);
                next([500, ["failed to fetch"], "failed request"]);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
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
        var _req$body2, department, branches, administrativeRole, staff;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _req$body2 = req.body, department = _req$body2.department, branches = _req$body2.branches, administrativeRole = _req$body2.administrativeRole;
                _context4.prev = 1;
                _context4.next = 4;
                return _Staff["default"].findById(req.params.staffid);

              case 4:
                staff = _context4.sent;
                // staff.branches = branches;
                staff.administrativeRole = administrativeRole;
                _context4.next = 8;
                return staff.save();

              case 8:
                if (_context4.sent) {
                  _context4.next = 10;
                  break;
                }

                throw new Error("failed");

              case 10:
                // if (!department || !validator.isMongoId(department))
                //   return next([400, ["department is required"], "failed to update"]);
                // staff.department = department;
                // const saved = await staff.save();
                // if (!saved) throw new Error("failed");
                res.send({
                  data: staff,
                  errors: null,
                  message: "staff details have been updated"
                });
                _context4.next = 17;
                break;

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](1);
                console.log(_context4.t0);
                next([500, ["failed to update staff details"], "failed request"]);

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 13]]);
      }));

      function update(_x10, _x11, _x12) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "remove",
    value: function () {
      var _remove = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
        var staff;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _Staff["default"].findById(req.params.staffid);

              case 3:
                staff = _context5.sent;
                staff.branches = staff.branches.filter(function (branch) {
                  return branch != req.params.branchid;
                });
                staff.save();
                res.send({
                  data: staff,
                  errors: null,
                  message: "staff has been successfully removed from branch"
                });
                _context5.next = 13;
                break;

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](0);
                console.error(_context5.t0);
                next([500, ["server failure"], "failed to remove staff from branch"]);

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 9]]);
      }));

      function remove(_x13, _x14, _x15) {
        return _remove.apply(this, arguments);
      }

      return remove;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
        var staff;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return _Staff["default"].findByIdAndDelete(req.params.staffid);

              case 3:
                staff = _context6.sent;

                if (!success) {
                  _context6.next = 6;
                  break;
                }

                return _context6.abrupt("return", res.send({
                  data: success,
                  errors: null,
                  message: "staff has been successfully removed from hospital branch"
                }));

              case 6:
                _context6.next = 12;
                break;

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](0);
                console.error(_context6.t0);
                next([500, ["server failure"], "failed to remove staff"]);

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 8]]);
      }));

      function _delete(_x16, _x17, _x18) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return HospitalStaffController;
}();

var _default = HospitalStaffController;
exports["default"] = _default;