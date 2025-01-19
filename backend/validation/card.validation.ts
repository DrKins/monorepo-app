import { z } from "zod";

export const cardSchema = z.object({
  content: z.string().nonempty("Content is required"),
});

export type CardParams = z.infer<typeof cardSchema>;
