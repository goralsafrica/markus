import { Schema, model } from "mongoose";

//preferred workspace url

const hospitalSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      unique: true,
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
    slug: {
      type: Number,
      default: Date.now(),
    },
    departments: [{ type: Schema.Types.ObjectId, ref: "Department" }],
  },
  { timestamps: true }
);
// convert all values to lower case for uniformity
const options = ["name", "email", "url"];
hospitalSchema.pre("save", async function (next) {
  for (const field of options) {
    this[field] = this[field].toLowerCase();
  }
  next();
});

export default model("Hospital", hospitalSchema);
