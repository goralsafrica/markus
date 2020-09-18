import { model, Schema } from "mongoose";

export default model(
  "Record",
  new Schema({
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
  })
);
