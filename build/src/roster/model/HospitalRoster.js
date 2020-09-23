"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var periodTime = new _mongoose.Schema({
  hour: {
    type: Number,
    min: 0,
    max: 23
  },
  minute: {
    type: Number,
    min: 0,
    max: 59
  },
  second: {
    type: Number,
    min: 0,
    max: 59
  }
});
var PeriodsSchema = new _mongoose.Schema({
  start: {
    type: periodTime,
    required: true
  },
  end: {
    type: periodTime,
    required: true
  }
});
var ShiftsTimeSchema = new _mongoose.Schema({}, {
  strict: true
});
var ShiftsSchema = new _mongoose.Schema({
  monday: {
    type: ShiftsTimeSchema,
    required: false
  },
  tuesday: {
    type: ShiftsTimeSchema,
    required: false
  },
  wednesday: {
    type: ShiftsTimeSchema,
    required: false
  },
  thursday: {
    type: ShiftsTimeSchema,
    required: false
  },
  friday: {
    type: ShiftsTimeSchema,
    required: false
  },
  saturday: {
    type: ShiftsTimeSchema,
    required: false
  },
  sunday: {
    type: ShiftsTimeSchema,
    required: false
  }
});
var RosterSchema = new _mongoose.Schema({
  hospital: {
    type: _mongoose.Schema.Types.ObjectId,
    required: false
  },
  roster: {
    type: ShiftsSchema,
    required: false
  },
  periods: {
    type: [PeriodsSchema],
    required: false
  },
  validFor: {
    type: [Date],
    required: false
  }
}, {
  timestamps: true,
  strict: false
});

var _default = (0, _mongoose.model)("Roster", RosterSchema);

exports["default"] = _default;