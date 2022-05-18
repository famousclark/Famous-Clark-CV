import mongoose from "mongoose";

const FragmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a blurb for this fragment."],
    maxlength: [20, "Name cannot be more than 60 characters"],
  },
  blurb: {
    type: String,
    required: [true, "Please provide a blurb for this fragment."],
    maxlength: [60, "Name cannot be more than 180 characters"],
  },

  fragments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Response" }],
});

export default mongoose.models.Fragment ||
  mongoose.model("Fragment", FragmentSchema);
