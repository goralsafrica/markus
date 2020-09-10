import { model, Schema } from "mongoose";

const StaffCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  titles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
});

export default model("StaffCategory", StaffCategorySchema);
