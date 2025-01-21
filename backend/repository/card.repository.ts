import type { Request } from "express";
import { sequelize } from "../config/db";
import { User } from "../models";
import { Card } from "../models/Card";

type CardParams = {
  content: string;
  userId: number;
};

type UpdateCardReactionCountParams = {
  cardId: number;
  totalLikes: number;
  totalDislikes: number;
};

export class CardRepository {
  async getCardById(cardId: number) {
    try {
      const card = await Card.findByPk(cardId);
      return card;
    } catch (error) {
      console.error("Error fetching card:", error);
      throw error;
    }
  }

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

  async createCard(cardParam: CardParams) {
    try {
      const card = await Card.create(cardParam);
      const results = await card.save();
      return results;
    } catch (error) {
      throw error;
    }
  }

  async updateCardReactionCount({
    cardId,
    totalLikes,
    totalDislikes,
  }: UpdateCardReactionCountParams) {
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

  async deleteCard(req: Request) {}
}
