import { Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role?: "admin" | "user";
  address: {
    city: string;
    street: string;
    zip: number;
  };
}

export interface userInstanceMethod {
  hashPassword(password: string): string;
}
