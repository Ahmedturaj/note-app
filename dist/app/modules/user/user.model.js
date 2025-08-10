"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const UserSchema = new mongoose_1.Schema({
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
        validate: [validator_1.default.isEmail]
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
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
