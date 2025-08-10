"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodNoteSchema = void 0;
const zod_1 = require("zod");
exports.zodNoteSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    content: zod_1.z.string().min(1, "Content is required"),
    category: zod_1.z.enum(["personal", "work", "other"]).default("personal"),
    pinned: zod_1.z.boolean().default(false),
    tags: zod_1.z.object({
        label: zod_1.z.string().min(1, "Tag label is required"),
        color: zod_1.z.string().min(1, "Tag color is required"),
    }),
    userId: zod_1.z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid userId format (must be ObjectId)"),
});
