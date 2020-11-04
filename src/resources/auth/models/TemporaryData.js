import { model, Schema } from "mongoose";
import types from "../../../seeders/temporaryDatatypes";

const temporaryData = new Schema({
  staff: {
    type: Schema.Types.ObjectId,
    ref: "Staff",
  },
  type: {
    type: String,
    enum: types,
    required: true,
  },
  socketID: String,
  verificationCode: String,
  createdAt: {
    type: Date,
    required: false,
  },
});
temporaryData.index({ createdAt: 1 }, { expireAfterSeconds: 300 });
export default model("TemporaryData", temporaryData);
