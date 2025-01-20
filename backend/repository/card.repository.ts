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
  async getCards() {
    try {
      const cards = await Card.findAll({
        attributes: [
          "id",
          "content",
          [
            sequelize.literal(`(
            SELECT GROUP_CONCAT(r.userId)
            FROM reactions AS r
            WHERE r.cardId = Card.id AND r.type = 'like'
          )`),
            "likedByUserIds",
          ],
          [
            sequelize.literal(`(
            SELECT GROUP_CONCAT(r.userId)
            FROM reactions AS r
            WHERE r.cardId = Card.id AND r.type = 'dislike'
          )`),
            "dislikedByUserIds",
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

      if (existingReaction) {
        await existingReaction.update({ type });
        return "Reaction updated successfully";
      }
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

  async updateCard(req: Request) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const card = await Card.findByPk(id);
      if (!card) {
        throw new Error("Card not found");
      }
      card.set({ content });
      await card.save();
      return "Task updated successfully";
    } catch (error) {
      throw error;
    }
  }
}
