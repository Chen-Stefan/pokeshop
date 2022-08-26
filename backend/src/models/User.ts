import * as dotenv from "dotenv";
import mongoose, { Document, Schema, model } from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  resetPasswordToken: any;
  resetPasswordExpire: any;
  matchPasswords(password: string): boolean;
  getSignedToken(): string;
  getResetPasswordToken(): string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username cannot be empty"],
      unique: true
    },
    email: {
      type: String,
      required: [true, "Please provide a user email"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email address",
      ],
    },
    // Select means for every query of user, we don't want to return the password for security
    password: {
      type: String,
      required: [true, "Please set up a password"],
      minlength: 6,
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  // Create a salt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPasswords = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, `${process.env.JWT_SECRET}`, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

// User is name of collection, user is what the collection is defined as
const User = mongoose.model<IUser>("User", userSchema);

export { User, IUser };
