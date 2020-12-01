import { model, Schema } from "mongoose";

const conversationsSchema = new Schema({
  fileName: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  extension: {
    type: String,
    required: true,
  },
  objectURL: {
    type: String,
    required: true,
  },
  s3FilePath: {
    type: String,
    required: true,
  },
  TranscriptionJobName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "uninitialized",
    enum: ["uninitialized", "pending", "transcribed"],
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

const SessionSchema = new Schema(
  {
    associatedEMR: {
      type: Schema.Types.ObjectId,
      ref: "EMR",
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
      type: conversationsSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default model("Session", SessionSchema);
