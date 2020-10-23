import { model, Schema } from "mongoose";

const PaymentSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    amountDue: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Payment", PaymentSchema);
