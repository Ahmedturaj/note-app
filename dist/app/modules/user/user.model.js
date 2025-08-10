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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
// Instance methods type
// ---------------- Schema ----------------
const UserSchema = new mongoose_1.Schema({
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
        validate: [validator_1.default.isEmail, "Invalid email format"],
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
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
}, { timestamps: true });
// ---------------- Instance Methods ----------------
UserSchema.method("hashPassword", function (plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = yield bcryptjs_1.default.hash(plainPassword, 10);
        this.password = password;
    });
});
// ---------------- Model ----------------
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
