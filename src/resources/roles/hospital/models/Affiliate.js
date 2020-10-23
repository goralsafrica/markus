import { Schema, model } from "mongoose";

const AffiliateSchema = Schema(
  {
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
    },
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
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Affiliate", AffiliateSchema);
