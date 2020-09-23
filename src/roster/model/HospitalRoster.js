import { model, Schema } from "mongoose";

const periodTime = new Schema({
  hour: { type: Number, min: 0, max: 23 },
  minute: { type: Number, min: 0, max: 59 },
  second: { type: Number, min: 0, max: 59 },
});
const PeriodsSchema = new Schema({
  start: {
    type: periodTime,
    required: true,
  },
  end: {
    type: periodTime,
    required: true,
  },
});

const ShiftsTimeSchema = new Schema(
  {},
  {
    strict: true,
  }
);
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
export default model("Roster", RosterSchema);
