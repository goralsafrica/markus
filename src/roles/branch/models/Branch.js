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
    city: String,
    state: String,
    country: String,
    email: String,
    phone: String,
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
