import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.interface";

const UserSchema: Schema<IUser> = new Schema<IUser>({
    firstName: { type: String, required: true, minlength:4, maxlength:20, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { 
        type: String,
        required: [true, "This field is required."], 
        unique: [true,"The Email is common."],
        trim: true,
        validate:{
            validator: function(value){
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
            },
            message:function(props){
                return `Email ${props.value} is not valid email `
            }
        }
    
    },
    password: { type: String, required: true, trim: true },
    age: {
        type: Number,
        required: true,
        min:18,
        max:40
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    }
}, { timestamps: true });

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
