import { model, Schema } from "mongoose";

const StaffCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export default model("StaffCategory", StaffCategorySchema);
