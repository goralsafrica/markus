import { Schema, model } from "mongoose";

const branchSchema = Schema(
  {
    landmark: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    hospital: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Hospital",
    },
  },
  { timestamps: true }
);

export default model("Branch", branchSchema);
