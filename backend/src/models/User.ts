import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      index: { unique: true },
    },
    password: String,
    email: {
      type: String,
      index: { unique: true },
    },
  },
  { timestamps: true }
);
// User is name of collection, user is what the collection is defined as
export default mongoose.model("User", userSchema);
  