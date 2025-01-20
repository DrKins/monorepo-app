import type { Request } from "express";
import { sequelize } from "../config/db";
import { Reaction, User } from "../models";
import { Card } from "../models/Card";

type CardParams = {
  content: string;
  userId: number;
};

type AddReactionParams = {
  userId: number;
  cardId: number;
  type: "like" | "dislike";
};

export class CardRepository {
  async getCards(req: Request) {
    const userId = req?.user?.id;
    try {
      const cards = await Card.findAll({
        attributes: [
          "id",
          "content",
          "totalLikes",
          "totalDislikes",
          [
            sequelize.literal(`(
            SELECT COUNT(*)
            FROM reactions AS r
            WHERE r.cardId = Card.id AND r.userId = '${userId}' AND r.type = 'like'
          )`),
            "isLikedByCurrentUser",
          ],
          [
            sequelize.literal(`(
            SELECT COUNT(*)
            FROM reactions AS r
            WHERE r.cardId = Card.id AND r.userId = '${userId}' AND r.type = 'dislike'
          )`),
            "isDislikedByCurrentUser",
          ],
        ],
        include: [
          {
            model: User,
            as: "owner",
            attributes: ["email", "id"],
          },
        ],
      });
      return cards;
    } catch (error) {
      console.error("Error fetching cards:", error);
      throw error;
    }
  }
  async addReaction({ cardId, userId, type }: AddReactionParams) {
    try {
      const existingReaction = await Reaction.findOne({
        where: { userId, cardId },
      });

      const card = await Card.findByPk(cardId);

      if (existingReaction && existingReaction.type === type) {
        type === "like"
          ? card?.update({ totalLikes: card.totalLikes - 1 })
          : card?.update({ totalDislikes: card.totalDislikes - 1 });

        await existingReaction.destroy();
        return "Reaction removed successfully";
      } else if (existingReaction) {
        type === "like"
          ? card?.update({ totalLikes: card.totalLikes + 1 })
          : card?.update({ totalDislikes: card.totalDislikes + 1 });
        await existingReaction.update({ type });
        return "Reaction updated successfully";
      }
      type === "like"
        ? card?.update({ totalLikes: card.totalLikes + 1 })
        : card?.update({ totalDislikes: card.totalDislikes + 1 });
      await Reaction.create({ userId, cardId, type });
      return "Reaction added successfully";
    } catch (error) {
      throw error;
    }
  }

  async createCard(cardParam: CardParams) {
    try {
      const card = await Card.create(cardParam);
      const results = await card.save();
      return results;
    } catch (error) {
      throw error;
    }
  }

  async deleteCard(req: Request) {}
}
