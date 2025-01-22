import type { NextFunction, Request, Response } from "express";
import { CardRepository } from "../repository/card.repository";
import { cardSchema } from "../validation/card.validation";

type GetCardsTypeProps = {
  search?: string;
  userId: number;
};

export class CardService {
  private cardRepository: CardRepository;

  constructor(cardRepository: CardRepository) {
    this.cardRepository = cardRepository;
  }

  async getCards({ search, userId }: GetCardsTypeProps) {
    if (search) {
      const cards = await this.cardRepository.searchCards(search);
      return cards;
    }
    const cards = await this.cardRepository.getCards({ userId });
    if (!cards) throw new Error("Error fetching cards");
    return cards;
  }

  async createCard(req: Request, res: Response, next?: NextFunction) {
    const validatedData = cardSchema.parse(req.body);

    const task = await this.cardRepository.createCard({
      ...validatedData,
      userId: req?.user?.id,
    });
    if (!task) throw new Error("Error creating task");
    return task;
  }

  async deleteCard(req: Request, res: Response, next?: NextFunction) {
    const task = await this.cardRepository.deleteCard(req);
    return task;
  }
}
