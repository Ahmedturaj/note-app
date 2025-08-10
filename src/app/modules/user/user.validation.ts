import { z } from "zod";

export const userZodSchema = z.object({
  firstName: z.string().min(4).max(20),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  age: z.number().min(18).max(40),
  role: z.enum(["admin", "user"]).optional(),
  address: z
    .object({
      city: z.string(),
      street: z.string(),
      zip: z.number(),
    })
    .optional(),
});
