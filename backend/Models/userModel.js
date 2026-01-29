import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    profilePhoto: {
      type: String,
      default: ""
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "Gender must be male or female"
      },
      required: true
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
