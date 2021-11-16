import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  googleId: { type: String, required: true },
  role: { type: String, default: "seller" },
  state: { type: String, default: "pending" },
  id: { type: String },
});

export default mongoose.model("User", userSchema);