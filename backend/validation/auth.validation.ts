import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Email adress is invalid")
    .nonempty("Email adress is required"),
  password: z.string().nonempty("Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;
