import { model, Schema } from "mongoose";

const RosterSchema = new Schema({
  hospital: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  roster: [],
});

export default model("Roster", RosterSchema);
