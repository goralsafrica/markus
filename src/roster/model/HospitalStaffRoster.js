import { model, Schema } from "mongoose";

const ShiftsSchema = new Schema({
  monday: {
    type: ShiftsTimeSchema,
    required: false,
  },
  tuesday: {
    type: ShiftsTimeSchema,
    required: false,
  },
  wednesday: {
    type: ShiftsTimeSchema,
    required: false,
  },
  thursday: {
    type: ShiftsTimeSchema,
    required: false,
  },
  friday: {
    type: ShiftsTimeSchema,
    required: false,
  },
  saturday: {
    type: ShiftsTimeSchema,
    required: false,
  },
  sunday: {
    type: ShiftsTimeSchema,
    required: false,
  },
});

const RosterSchema = new Schema(
  {
    hospital: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    roster: {
      type: ShiftsSchema,
      required: false,
    },
    periods: {
      type: [PeriodsSchema],
      required: false,
    },
    validFor: {
      type: [Date],
      required: false,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);
