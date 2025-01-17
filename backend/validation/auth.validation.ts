import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Email adress is invalid")
    .nonempty("Email adress is required"),
  password: z.string().nonempty("Password is required"),
});

export const registerSchema = loginSchema
  .extend({
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must contain at least 8 characters"),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password does not match Password",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export type LoginInput = z.infer<typeof loginSchema>;
