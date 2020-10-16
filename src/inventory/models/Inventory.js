import { Schema, model } from "mongoose";

const InventorySchema = new Schema(
  {
    branch: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Branch",
    },
    store: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

export default model("Inventory", InventorySchema);
