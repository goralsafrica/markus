import { model, Schema } from "mongoose";

const SessionSchema = new Schema(
  {
    associatedEMR: {
      type: Schema.Types.ObjectId,
      ref: "Workflow",
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
    conversation: {
      type: String,
      required: false,
    },
    recommendation: String,
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
