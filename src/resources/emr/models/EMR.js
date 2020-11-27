import { model, Schema } from "mongoose";

const objectid = (path, required = true) => ({
  type: Schema.Types.ObjectId,
  ref: path,
  required,
});

const emrSchema = new Schema(
  {
    hospital: objectid("Hospital"),
    branch: objectid("Branch", false),
    session: objectid("Session"),
    patient: objectid("Patient"),
    vitalSigns: objectid("VitalReading", false),
    prescription: objectid("Prescription", false),
    recommendation: objectid("Recommendation", false),
  },
  {
    timestamps: true,
  }
);
export default model("EMR", emrSchema);
