import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    bio: { type: String, default: "", trim: true },
    avatar: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema, "users");
export default User;
