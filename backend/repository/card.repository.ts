import type { Request } from "express";
import { Card } from "../models/Card";

type CardParams = {
  content: string;
  userId: number;
};

export class CardRepository {
  async getCards() {
    try {
      const cards = await Card.findAll();
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

  async deleteCard(req: Request) {
    try {
      const { id } = req.params;
      const card = await Card.findByPk(id);
      if (!card) {
        throw new Error("Card not found");
      }
      await card.destroy();
      return "Task deleted successfully";
    } catch (error) {
      throw error;
    }
  }

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
