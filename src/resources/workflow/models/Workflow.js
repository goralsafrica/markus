import { model, Schema } from "mongoose";

const workflowSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
    },
    precedingWorkflow: {
      type: Schema.Types.ObjectId,
      ref: "Workflow",
    },
    emr: {
      type: Schema.Types.ObjectId,
      ref: "Record",
    },
    esession: {
      type: Schema.Types.ObjectId,
      ref: "Session",
    },
    closeDate: {
      type: Date,
      required: false,
    },
    staff: {
      type: [{ type: Schema.Types.ObjectId, ref: "Staff" }],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Workflow", workflowSchema);
