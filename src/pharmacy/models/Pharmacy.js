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
  {
    name: {
      type: String,
      required: true,
    },
    drugs: {
      type: [DrugSchema],
    },
  },
  {
    timestamps: true,
  }
);

const PharmacySchema = new Schema(
  {
    branch: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    categories: {
      type: DrugCategorySchema,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Pharmacy", PharmacySchema);
