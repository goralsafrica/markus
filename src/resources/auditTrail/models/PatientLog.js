import { model, Schema } from "mongoose";

const ReferenceSchema = new Schema({
  refId: {
    type: Schema.Types.ObjectId,
    refPath: "refModel",
  },
  refModel: {
    type: String,
  },
});

const PatientLogSchema = new Schema(
  {
    doer: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    reference: {
      type: ReferenceSchema,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model("PatientLog", PatientLogSchema);
