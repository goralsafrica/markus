import { model, Schema } from "mongoose";

const PatientSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    residentAddress: {
      type: String,
    },
    workAddress: {
      type: String,
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    nextOfKin: {
      type: String,
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Patient", PatientSchema);
