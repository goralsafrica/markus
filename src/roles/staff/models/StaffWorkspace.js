import { model, Schema } from "mongoose";

const administrativeRoleSchema = new Schema({
  name: String,
  branch: {
    type: Schema.Types.ObjectId,
    ref: "Branch",
  },
  department: String,
});
const roleSchema = new Schema({
  name: String,
  categoey: String,
});

const staffWorkspaceSchema = new Schema({
  staff: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Staff",
  },
  hospital: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Hospital",
  },
  department: String,
  branches: [{ type: Schema.Types.ObjectId, ref: "Branch" }],
  role: roleSchema,
  administrativeRole: administrativeRoleSchema,
});

export default model("StaffWorkspace", staffWorkspaceSchema);
