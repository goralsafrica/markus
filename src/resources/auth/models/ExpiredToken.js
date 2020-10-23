import { model, Schema } from "mongoose";

const schema = new Schema({
  token: String,
});

export default model("ExpiredToken", schema);
