import { model, Schema } from "mongoose";

const PrescriptionSchema = new Schema({
  session: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Session",
  },
  received: {
    type: Boolean,
    default: false,
  },
});

export default model("Prescription", PrescriptionSchema);
