import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ReactionRepository } from "../repository/reaction.respository";
import { cardRepository } from "../routes";
import { generateErrorResponse } from "../utils/generateErrorResponse";
import { reactionSchema } from "../validation/card.validation";

export class ReactionService {
  private reactionRepository: ReactionRepository;

  constructor(reactionRepository: ReactionRepository) {
    this.reactionRepository = reactionRepository;
  }

  async addReaction(req: Request, res: Response, next?: NextFunction) {
    try {
      if (req.body) {
        const validatedData = reactionSchema.parse(req.body);
        const { type } = validatedData;
        const userId = req?.user?.id;
        const cardId = parseInt(req.params.id);

        const existingReaction =
          await this.reactionRepository.getReactionByCardIdAndUserId({
            cardId,
            userId,
          });

        const card = await cardRepository.getCardById(cardId);
        if (!card) throw new Error("Card not found");

        if (existingReaction && existingReaction.type === type) {
          type === "like"
            ? this.reactionRepository.updateReaction({
                totalLikes: card.totalLikes - 1,
                cardId,
                totalDislikes: card.totalDislikes,
              })
            : this.reactionRepository.updateReaction({
                totalDislikes: card.totalDislikes - 1,
                cardId,
                totalLikes: card.totalLikes,
              });

          await existingReaction.destroy();
          return "Reaction removed successfully";
        } else if (existingReaction) {
          type === "like"
            ? this.reactionRepository.updateReaction({
                cardId,
                totalLikes: card.totalLikes + 1,
                totalDislikes: card.totalDislikes - 1,
              })
            : this.reactionRepository.updateReaction({
                cardId,
                totalDislikes: card.totalDislikes + 1,
                totalLikes: card.totalLikes - 1,
              });
          await existingReaction.update({ type });
          return "Reaction updated successfully";
        }
        type === "like"
          ? this.reactionRepository.updateReaction({
              cardId,
              totalLikes: card.totalLikes + 1,
              totalDislikes: card.totalDislikes,
            })
          : this.reactionRepository.updateReaction({
              cardId,
              totalLikes: card.totalLikes,
              totalDislikes: card.totalDislikes + 1,
            });

        const task = await this.reactionRepository.addReaction({
          userId,
          cardId,
          type: validatedData.type,
        });
        return task;
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
