import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { CardRepository } from "../repository/card.repository";
import { ReactionRepository } from "../repository/reaction.respository";
import { generateErrorResponse } from "../utils/generateErrorResponse";
import { reactionSchema } from "../validation/card.validation";

export class ReactionService {
  constructor(
    private reactionRepository: ReactionRepository,
    private cardRepository: CardRepository,
  ) {}

  async addReaction(req: Request, res: Response, next?: NextFunction) {
    try {
      if (req.body) {
        const validatedData = reactionSchema.parse(req.body);
        const { type } = validatedData;
        const userId = parseInt(req?.user?.id);
        const cardId = parseInt(req.params.id);

        const existingReaction =
          await this.reactionRepository.getReactionByCardIdAndUserId({
            userId,
            cardId,
          });

        const card = await this.cardRepository.getCardById(cardId);
        if (!card) throw new Error("Card not found");

        if (existingReaction && existingReaction.type === type) {
          type === "like"
            ? this.cardRepository.updateCardReactionCount({
                totalLikes: card.totalLikes - 1,
                cardId,
                totalDislikes: card.totalDislikes,
              })
            : this.cardRepository.updateCardReactionCount({
                totalDislikes: card.totalDislikes - 1,
                cardId,
                totalLikes: card.totalLikes,
              });

          await existingReaction.destroy();
          return "Reaction removed successfully";
        } else if (existingReaction) {
          type === "like"
            ? this.cardRepository.updateCardReactionCount({
                cardId,
                totalLikes: card.totalLikes + 1,
                totalDislikes: card.totalDislikes - 1,
              })
            : this.cardRepository.updateCardReactionCount({
                cardId,
                totalDislikes: card.totalDislikes + 1,
                totalLikes: card.totalLikes - 1,
              });
          await existingReaction.update({ type });
          return "Reaction updated successfully";
        }
        type === "like"
          ? this.cardRepository.updateCardReactionCount({
              cardId,
              totalLikes: card.totalLikes + 1,
              totalDislikes: card.totalDislikes,
            })
          : this.cardRepository.updateCardReactionCount({
              cardId,
              totalLikes: card.totalLikes,
              totalDislikes: card.totalDislikes + 1,
            });

        const task = await this.reactionRepository.addReaction({
          userId,
          cardId,
          type: validatedData.type,
        });
        if (!task) throw new Error("Error adding reaction");
        return "Reaction added successfully";
      } else {
        throw new Error("No type of reaction provided");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422).json(generateErrorResponse(error.errors));
        return;
      }

      if (error instanceof Error) {
        res.status(500).json(generateErrorResponse(error.message, true));
        return;
      }
    }
  }
}
