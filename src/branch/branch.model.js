import { Schema, model } from "mongoose";

const branchSchema = Schema(
  {
    landmarks: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Branch", branchSchema);
