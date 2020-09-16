import { model, Schema } from "mongoose";

const Currency = model(
  "Currency",
  new Schema({
    symbol: {
      type: String,
      required: true,
    },
    words: {
      type: String,
      required: true,
    },
  })
);

const Price = model(
  "Price",
  new Schema(
    {
      hospital: {
        type: Schema.Types.ObjectId,
        ref: "Hospital",
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      // currency: {
      //   type: Schema.Types.ObjectId,
      //   ref: "Currency",
      // },
      currency: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  )
);

export { Currency, Price };
