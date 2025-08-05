import mongoose, { Schema } from "mongoose"
import { IUser } from "./user.interface"

const UserSchema: Schema<IUser> = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        enum: ["admin", "user"],
        default:"user"
    }
})

const User= mongoose.model("user", UserSchema);
export default User;