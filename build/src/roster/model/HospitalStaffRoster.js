"use strict";

var _mongoose = require("mongoose");

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