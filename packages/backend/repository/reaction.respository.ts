import { Reaction } from "../models";

type AddReactionParams = {
  userId: number;
  cardId: number;
  type: "like" | "dislike";
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
    const reaction = await Reaction.findOne({
      where: {
        userId,
        cardId,
      },
    });
    return reaction;
  }

  async addReaction({ cardId, userId, type }: AddReactionParams) {
    const reaction = await Reaction.create({ userId, cardId, type });
    if (!reaction) throw new Error("Error adding reaction");
    return reaction;
  }
}
