import bcrypt from "bcryptjs";
import mongoose, { Model, Schema } from "mongoose";
import validator from "validator";
import { IUser, UserInstanceMethods } from "./user.interface";

// Instance methods type

// ---------------- Schema ----------------
const UserSchema = new Schema<IUser, Model<IUser>, UserInstanceMethods>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      minlength: [4, "First name must be at least 4 characters long."],
      maxlength: [20, "First name must be at most 20 characters long."],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "This field is required."],
      unique: [true, "This email is already in use."],
      trim: true,
      validate: [validator.isEmail, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minlength: [5, "Password must be at least 5 characters long"],
      maxlength: [10, "Password must be at most 10 characters long"],
    },
    age: {
      type: Number,
      required: [true, "Age is required."],
      min: [18, "You must be at least 18 years old."],
      max: [40, "You must be at most 40 years old."],
    },
    address: {
      city: String,
      street: String,
      zip: Number,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

// ---------------- Instance Methods ----------------
UserSchema.method("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

// ---------------- Model ----------------
const User = mongoose.model<IUser, Model<IUser, {}, UserInstanceMethods>>(
  "User",
  UserSchema
);

export default User;
