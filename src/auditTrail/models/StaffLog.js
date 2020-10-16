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

const StaffLogSchema = new Schema(
  {
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    doer: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    receiver: {
      type: ReferenceSchema,
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

export default model("StaffLog", StaffLogSchema);
