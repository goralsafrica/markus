import { model, Schema } from "mongoose";

const RolesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "StaffCategory",
  },
});

export default model("Role", RolesSchema);
