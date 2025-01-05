import * as z from "zod";

export const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

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