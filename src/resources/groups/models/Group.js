import { Schema, model } from "mongoose";

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hospital: {
      type: String,
      required: true,
    },
    description: String,
    members: {
      type: [{ type: Schema.Types.ObjectId, ref: "Staff" }],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Group", groupSchema);
