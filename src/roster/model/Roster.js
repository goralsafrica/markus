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

const RosterSchema = new Schema({
  hospital: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  roster: {
    type: [],
    required: true,
  },
  periods: {
    type: [PeriodsSchema],
    required: true,
  },
  validFor: {
    type: [Date],
    required: true,
  },
});

export default model("Roster", RosterSchema);
