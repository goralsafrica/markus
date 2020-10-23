import { Schema, model } from "mongoose";

const DrugSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  ageRange: {
    minimum: {
      type: Number,
      required: true,
    },
    maximum: {
      type: Number,
      required: true,
    },
  },
  mg: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const DrugCategorySchema = new Schema(
  {},
  {
    timestamps: true,
    strict: false,
  }
);

const PharmacySchema = new Schema(
  {
    branch: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    drugs: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    minimize: false,
    strict: false,
  }
);

export default model("Pharmacy", PharmacySchema);
