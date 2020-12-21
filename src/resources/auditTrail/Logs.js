import { model, Schema } from "mongoose";

const ReferenceSchema = new Schema({
  details: {
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
    reference: String,
  },
  {
    timestamps: true,
  }
);

StaffLogSchema.pre("save", function (next) {
  if (!this.reference) return next();
  this.reference = this.reference.split("\n").join("");
  next();
});

export default model("Log", StaffLogSchema);
