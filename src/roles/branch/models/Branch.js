import { Schema, model } from "mongoose";

const branchSchema = Schema(
  {
    branchName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    hospital: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Hospital",
    },
    departments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Department",
      },
    ],
  },
  { timestamps: true }
);

export default model("Branch", branchSchema);
