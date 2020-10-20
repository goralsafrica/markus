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
      unique: true,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    url: {
      type: String,
      unique: true,
    },
    departments: [{ type: Schema.Types.ObjectId, ref: "Department" }],
  },
  { timestamps: true }
);

hospitalSchema.pre("");

export default model("Hospital", hospitalSchema);
