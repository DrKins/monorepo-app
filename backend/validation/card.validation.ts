import { z } from "zod";

export const cardSchema = z.object({
  content: z.string().nonempty("Content is required"),
  userEmail: z.string().email("Email is invalid").nonempty("Email is required"),
});

export type CardParams = z.infer<typeof cardSchema>;
