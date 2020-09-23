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

var BranchStaffController = /*#__PURE__*/function () {
  function BranchStaffController() {
    (0, _classCallCheck2["default"])(this, BranchStaffController);
  }

  (0, _createClass2["default"])(BranchStaffController, null, [{
    key: "getStaffs",
    value: function () {
      var _getStaffs = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var branch, data;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                branch = req.staff.administrativeRole.branch;
                _context.prev = 1;
                _context.next = 4;
                return _Staff["default"].find({
                  branches: {
                    $in: [branch._id]
                  }
                }).populate("department").populate({
                  path: "role",
                  model: "Role",
                  populate: {
                    path: "category",
                    model: "StaffCategory"
                  }
                });

              case 4:
                data = _context.sent;
                if (!data) next([400, ["invalid branch id"], "staff members not found"]);
                res.send({
                  data: data,
                  errors: null,
                  message: "branch staff members list retireved"
                });
                _context.next = 13;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);
                console.log(_context.t0);
                next([500, ["server  failed to respond :("], "request failure"]);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 9]]);
      }));

      function getStaffs(_x, _x2, _x3) {
        return _getStaffs.apply(this, arguments);
      }

      return getStaffs;
    }()
  }, {
    key: "updateStaff",
    value: function () {
      var _updateStaff = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
        var staff, data;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _Staff["default"].findByIdAndUpdate(req.params.staffid, {
                  department: req.body.department
                }, {
                  useFindAndModify: false
                });

              case 3:
                staff = _context2.sent;
                _context2.next = 6;
                return _Staff["default"].findById(req.params.staffid).populate({
                  path: "department",
                  model: "Department"
                });

              case 6:
                data = _context2.sent;

                if (!(!staff || !data)) {
                  _context2.next = 9;
                  break;
                }

                throw new Error("okay");

              case 9:
                res.json({
                  data: data,
                  errurs: null,
                  message: "staff details in branch has been updated successfully"
                });
                _context2.next = 15;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](0);
                //console.log(err);
                next([500, "server  failed to respond :("]);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 12]]);
      }));

      function updateStaff(_x4, _x5, _x6) {
        return _updateStaff.apply(this, arguments);
      }

      return updateStaff;
    }()
  }]);
  return BranchStaffController;
}();

var _default = BranchStaffController;
exports["default"] = _default;