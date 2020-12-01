import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    token: String,
  },
  {
    timestamps: true,
  }
);

schema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 3 });

export default model("ExpiredToken", schema);
