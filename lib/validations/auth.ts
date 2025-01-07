import * as z from "zod";

export const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .max(16, "Password must be at most 16 characters");

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: passwordSchema,
  rememberMe: z.boolean().default(false),
});

export const userSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
  name: z.string().min(2),
  role: z.enum(["admin", "user"]),
});