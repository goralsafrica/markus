import { model, Schema } from "mongoose";

const RosterSchema = new Schema(
  {},
  {
    timestamps: true,
    strict: false,
  }
);
export default model("HospitalStaffRoster", RosterSchema);
