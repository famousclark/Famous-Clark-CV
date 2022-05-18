import mongoose from "mongoose";
import * as Constants from "../constants";

const ResponseSchema = new mongoose.Schema({
  username: { type: String, required: true },
  prompt: { type: String, required: true },
  fragment: { type: String },
  text: { type: String, required: true },
  deckIndex: { type: Number, default: 0, required: true },
  orientation: { type: String, default: Constants.UPRIGHT, required: true },
  time_stamped: { type: Date, default: Date.now },
  prompt_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prompt" }],
});

export default mongoose.models.Response ||
  mongoose.model("Response", ResponseSchema);
