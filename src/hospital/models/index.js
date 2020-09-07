import { Schema, model } from "mongoose";

const hospitalSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    branches: [{ type: Schema.Types.ObjectId, ref: "Branch" }],
    departments: [{ type: Schema.Types.ObjectId, ref: "Department" }],
  },
  { timestamps: true }
);

export default model("Hospital", hospitalSchema);
