"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Hospital = _interopRequireDefault(require("../models/Hospital"));

var _Staff = _interopRequireDefault(require("../../staff/models/Staff"));

var DepartmentController = /*#__PURE__*/function () {
  function DepartmentController() {
    (0, _classCallCheck2["default"])(this, DepartmentController);
  }

  (0, _createClass2["default"])(DepartmentController, null, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var departments, data, hospital, _hospital$departments, _hospital$departments2, departmentsInDb, unAssigned;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                departments = req.body.departments;
                _context.prev = 1;
                _context.next = 4;
                return DepartmentController.getHospital(req, next);

              case 4:
                hospital = _context.sent;

                if (hospital) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", next(400, ["invalid hospital"], "failed to create department"));

              case 7:
                if (hospital.departments == 0) {
                  (_hospital$departments = hospital.departments).push.apply(_hospital$departments, (0, _toConsumableArray2["default"])(departments));
                } else {
                  //assign all hospital department in an array
                  departmentsInDb = {};
                  hospital.departments.forEach(function (d) {
                    if (departmentsInDb[d]) {
                      departmentsInDb[d] += 1;
                    } else {
                      departmentsInDb[d] = 1;
                    }
                  }); //find departments that aren't already there

                  unAssigned = departments.filter(function (d) {
                    return !departmentsInDb[d];
                  });
                  if (unAssigned.length > 0) (_hospital$departments2 = hospital.departments).push.apply(_hospital$departments2, (0, _toConsumableArray2["default"])(unAssigned));
                }

                _context.next = 10;
                return hospital.save();

              case 10:
                data = _context.sent;
                res.send({
                  data: data,
                  errors: null,
                  message: "departments have been created"
                });
                _context.next = 18;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](1);
                console.error(_context.t0);
                return _context.abrupt("return", next([500, ["server failed to respond"], "Failed"]));

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 14]]);
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
                return _Hospital["default"].findById(req.body.credentials.hospital).select("departments").populate("departments");

              case 3:
                data = _context2.sent;
                if (!data) next([400, ["invalid input data"], "failed to fetch branch"]);
                res.send({
                  data: data,
                  errors: null,
                  mesaage: "departments found"
                });
                _context2.next = 12;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);
                next([500, ["server  failed to respond :("], "failed to create branch"]);

              case 12:
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
        var hospital, department, hospitaldata, staffs;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                hospital = req.body.credentials.hospital;
                department = req.body.department;
                _context3.prev = 2;
                _context3.next = 5;
                return DepartmentController.getHospital(req, next);

              case 5:
                hospitaldata = _context3.sent;
                _context3.next = 8;
                return _Staff["default"].find({
                  hospital: hospital,
                  department: department
                });

              case 8:
                staffs = _context3.sent;

                if (!(!hospital || !staffs)) {
                  _context3.next = 11;
                  break;
                }

                return _context3.abrupt("return", next([400, ["invalid credentials"], "failed"]));

              case 11:
                res.json({
                  data: {
                    hospital: hospitaldata,
                    staffs: staffs
                  },
                  errors: null,
                  message: "success"
                });
                _context3.next = 18;
                break;

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](2);
                console.log(_context3.t0);
                next([500, ["server  failed to respond :("], "failed to create branch"]);

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 14]]);
      }));

      function findOne(_x7, _x8, _x9) {
        return _findOne.apply(this, arguments);
      }

      return findOne;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
        var hasStaffs, data;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _Staff["default"].find({
                  hospital: req.body.credentials.hosptal,
                  department: req.params.departmentid
                });

              case 3:
                hasStaffs = _context4.sent;

                if (!hasStaffs) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("return", next([400, ["Department cannot be removed because it still has assigned staffs"], "failed"]));

              case 6:
                _context4.next = 8;
                return _Hospital["default"].findById(req.body.credentials.hospital);

              case 8:
                data = _context4.sent;
                console.log(req.params.departmentid);
                data.departments = data.departments.filter(function (dept) {
                  return dept != req.params.departmentid;
                });
                data.save();
                res.json({
                  data: data,
                  errors: null,
                  message: "department has been successfully removed from the hospital"
                });
                _context4.next = 19;
                break;

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](0);
                console.error(_context4.t0);
                next([500, ["server failed to respond"], "failed"]);

              case 19:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 15]]);
      }));

      function _delete(_x10, _x11, _x12) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "getHospital",
    value: function () {
      var _getHospital = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, next) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _Hospital["default"].findById(req.body.credentials.hospital);

              case 3:
                return _context5.abrupt("return", _context5.sent);

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5["catch"](0);
                console.error(_context5.t0);
                next([500, ["server failed to respond"], "failed"]);
                return _context5.abrupt("return");

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 6]]);
      }));

      function getHospital(_x13, _x14) {
        return _getHospital.apply(this, arguments);
      }

      return getHospital;
    }()
  }]);
  return DepartmentController;
}();

var _default = DepartmentController;
exports["default"] = _default;