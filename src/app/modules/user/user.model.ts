import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.interface";
import validator from 'validator';
const UserSchema: Schema<IUser> = new Schema<IUser>({
    firstName: { 
    type: String, 
    required: [true, "First name is required."], 
    min: [4, "First name must be at least 4 characters long."],
    max: [20, "First name must be at most 20 characters long."],
    trim: true 
},
    lastName: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: [true, "This field is required."],
        unique: [true, "The Email is common."],
        trim: true,
        // validate:{
        //     validator: function(value){
        //         return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
        //     },
        //     message:function(props){
        //         return `Email ${props.value} is not valid email `
        //     }
        // }
        validate: [validator.isEmail]
    },
    password: {
        type: String,
        required: [true, "Password is required"], trim: true,
        min: [5, "password must be at least 5 characters log"],
        max: [10, "Password must be at most 10 characters long."]
    },
    age: {
    type: Number,
    required: [true, "Age is required."],
    min: [18, "You must be at least 18 years old."],
    max: [40, "You must be at most 40 years old."]
},
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    }
}, { timestamps: true });

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
