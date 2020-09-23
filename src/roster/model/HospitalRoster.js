import { model, Schema } from "mongoose";

const PeriodsSchema = new Schema({
  start: {
    type: [
      {
        hour: {
          type: Number,
          min: 0,
          max: 23,
        },
        minute: {
          type: Number,
          min: 0,
          max: 59,
        },
      },
    ],
  },
  stop: {
    type: [
      {
        hour: {
          type: Number,
          min: 0,
          max: 23,
        },
        minute: {
          type: Number,
          min: 0,
          max: 59,
        },
      },
    ],
  },
});

const RosterSchema = new Schema(
  {
    hospital: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    staffRoster: {
      type: Schema.Types.ObjectId,
      ref: "HospitalStaffRoster",
      required: true,
    },
    shifts: {
      type: [PeriodsSchema],
      required: true,
    },
    valid: {
      type: [Date],
      required: false,
    },
    openingDays: {
      type: [],
      default: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
    },
  },
  {
    timestamps: true,
  }
);
export default model("HospitalRoster", RosterSchema);
