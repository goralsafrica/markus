import { Schema, model } from "mongoose";

const DrugStockSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const PharmacySchema = new Schema(
  {
    branch: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    drugs: [DrugStockSchema],
  },
  {
    timestamps: true,
  }
);

export default model("Pharmacy", PharmacySchema);
