import type { Request } from "express";
import { Op } from "sequelize";
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

type GetCardsParams = {
  userId: number;
  page: number;
  limit: number;
  filter?: string;
};

type SearchCardsParams = {
  query: string;
  page: number;
  limit: number;
  filter?: string;
  userId: number;
};

export class CardRepository {
  async searchCards({ query, filter, userId, page, limit }: SearchCardsParams) {
    try {
      const cards = await Card.findAndCountAll({
        attributes: [
          "id",
          "content",
          "totalLikes",
          "totalDislikes",
          "createdAt",
        ],
        include: [
          {
            model: User,
            as: "owner",
            attributes: ["email", "id"],
          },
        ],
        where: {
          ...(filter === "mine" ? { userId } : {}),
          content: {
            [Op.like]: `%${query}%`,
          },
        },
        ...(filter === "recent" || filter === "oldest"
          ? { order: [["createdAt", filter === "recent" ? "DESC" : "ASC"]] }
          : {}),
        limit: limit,
        offset: limit * page,
      });
      return cards;
    } catch (error) {
      console.error("Error searching cards:", error);
      throw error;
    }
  }

  async getCardById(cardId: number) {
    try {
      const card = await Card.findByPk(cardId);
      return card;
    } catch (error) {
      console.error("Error fetching card:", error);
      throw error;
    }
  }

  async getCards({ userId, page, limit, filter }: GetCardsParams) {
    try {
      const cards = await Card.findAndCountAll({
        attributes: [
          "id",
          "content",
          "totalLikes",
          "totalDislikes",
          "createdAt",
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
        where: {
          ...(filter === "mine" ? { userId } : {}),
        },
        ...(filter === "recent" || filter === "oldest"
          ? { order: [["createdAt", filter === "recent" ? "DESC" : "ASC"]] }
          : {}),
        limit: limit,
        offset: limit * page,
      });
      return cards;
    } catch (error) {
      console.error("Error fetching cards:", error);
      throw error;
    }
  }

  async createCard(cardParam: CardParams) {
    try {
      const cardAttributes = {
        ...cardParam,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const card = await Card.create(cardAttributes);
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
