import { model, Schema } from "mongoose";

const SessionSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    workflow: {
      type: Schema.Types.ObjectId,
      ref: "Workflow",
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    residentHospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    prescription: {
      type: Schema.Types.ObjectId,
      ref: "Prescription",
      required: true,
    },
    conversation: {
      type: String,
      required: false,
    },
    closed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Session", SessionSchema);
