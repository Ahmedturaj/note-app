"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodSchema = void 0;
const zod_1 = require("zod");
exports.userZodSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(4).max(20),
    lastName: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    age: zod_1.z.number().min(18).max(40),
    role: zod_1.z.enum(["admin", "user"]).optional(),
    address: zod_1.z.object({
        city: zod_1.z.string(),
        street: zod_1.z.string(),
        zip: zod_1.z.number()
    }).optional()
});
