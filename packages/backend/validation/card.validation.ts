import { z } from "zod";

export const cardSchema = z.object({
  content: z.string().nonempty("Content is required"),
});

export const reactionSchema = z.object({
  type: z.enum(["like", "dislike"]),
});

export type CardParams = z.infer<typeof cardSchema>;
export type CreateReactionData = z.infer<typeof reactionSchema>;
