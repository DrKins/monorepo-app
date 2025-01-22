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
    console.log("cardId", cardId, "userId", userId);
    const reaction = await Reaction.findOne({
      where: {
        userId,
        cardId,
      },
    });
    if (!reaction) throw new Error("Reaction not found");
    return reaction;
  }

  async addReaction({ cardId, userId, type }: AddReactionParams) {
    const reaction = await Reaction.create({ userId, cardId, type });
    if (!reaction) throw new Error("Error adding reaction");
    return reaction;
  }
}
