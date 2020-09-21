import { Schema, model } from "mongoose";

//preferred workspace url

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
    phone: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    code: {
      type: String,
      unique: true,
    },
    departments: [{ type: Schema.Types.ObjectId, ref: "Department" }],
  },
  { timestamps: true }
);

export default model("Hospital", hospitalSchema);
