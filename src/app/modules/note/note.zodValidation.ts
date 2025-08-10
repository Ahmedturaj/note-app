import { z } from "zod";

export const zodNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  category: z.enum(["personal", "work", "other"]).default("personal"),
  pinned: z.boolean().default(false),
  tags: z.object({
    label: z.string().min(1, "Tag label is required"),
    color: z.string().min(1, "Tag color is required"),
  }),
  userId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid userId format (must be ObjectId)"),
});
