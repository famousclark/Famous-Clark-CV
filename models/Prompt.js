import mongoose from "mongoose";

const PromptSchema = new mongoose.Schema({
  username: { type: String, required: true },
  time_stamped: { type: Date, default: Date.now },
  params: {
    prompt: { type: String, required: true },
    max_tokens: { type: Number, default: 500 },
    temperture: { type: Number, default: 1 },
    top_p: { type: Number, default: 1 },
    n: { type: Number, default: 1 },
    stream: { type: Boolean, default: false },
    logprobs: { type: Number, default: null },
    echo: { type: Boolean, default: false },
    stop: { type: String, default: null },
    presence_penalty: { type: Number, default: 0 },
    frequency_penalty: { type: Number, default: 0 },
  },

  reponse_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Response" }],
});

export default mongoose.models.Prompt || mongoose.model("Prompt", PromptSchema);
