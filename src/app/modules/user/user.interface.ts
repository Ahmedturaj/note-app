import { Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role?: "admin" | "user";
}