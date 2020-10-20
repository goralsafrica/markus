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
// convert all values to lower case for uniformity
hospitalSchema.pre("save", async function (next) {
  for (const key in this) {
    this[key] = this[key].toLowerCase();
    next();
  }
});

export default model("Hospital", hospitalSchema);
