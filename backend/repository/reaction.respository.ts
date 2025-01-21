import { Card, Reaction } from "../models";

type AddReactionParams = {
  userId: number;
  cardId: number;
  type: "like" | "dislike";
};

type UpdateReactionParams = {
  cardId: number;
  totalLikes: number;
  totalDislikes: number;
};

type GetReactionsByCardIdAndUserIdParams = {
  cardId: number;
  userId: number;
};

export class ReactionRepository {
  async getReactionByCardIdAndUserId({
    cardId,
    userId,
  }: GetReactionsByCardIdAndUserIdParams) {
    try {
      const reaction = await Reaction.findOne({
        where: { cardId, userId },
      });
      return reaction;
    } catch (error) {
      throw error;
    }
  }

  async updateReaction({
    cardId,
    totalLikes,
    totalDislikes,
  }: UpdateReactionParams) {
    try {
      const card = await Card.findByPk(cardId);
      card?.update({
        totalLikes,
        totalDislikes,
      });
    } catch (error) {
      throw error;
    }
  }
  async addReaction({ cardId, userId, type }: AddReactionParams) {
    try {
      await Reaction.create({ userId, cardId, type });
      return "Reaction added successfully";
    } catch (error) {
      throw error;
    }
  }
}
