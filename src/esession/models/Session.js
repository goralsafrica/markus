import { model, Schema, Mongoose } from "mongoose";

const SessionSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    residentHospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    preceedingEmr: {
      type: Schema.Types.ObjectId,
      ref: "Record",
      required: true,
    },
    preceedingSession: {
      type: Schema.Types.ObjectId,
      ref: "Session",
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

export default Mongoose.model("Session", SessionSchema);
