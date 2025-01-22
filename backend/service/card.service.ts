import type { NextFunction, Request, Response } from "express";
import { CardRepository } from "../repository/card.repository";
import { cardSchema } from "../validation/card.validation";

type GetCardsTypeProps = {
  search?: string;
  sort?: string;
  userId: number;
};

export class CardService {
  private cardRepository: CardRepository;

  constructor(cardRepository: CardRepository) {
    this.cardRepository = cardRepository;
  }

  async getCards({ search, sort, userId }: GetCardsTypeProps) {
    let cards;
    if (search) {
      cards = await this.cardRepository.searchCards(search);
      return cards;
    } else {
      cards = await this.cardRepository.getCards({ userId });
    }
    if (!cards) throw new Error("Error fetching cards");

    if (sort) {
      switch (sort) {
        case "recent":
          cards = cards.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          break;
        case "oldest":
          cards = cards.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
          );
          break;
        case "mine":
          cards = cards.filter((card) => card?.owner?.id === userId);
          break;
        default:
          throw new Error(`Unknown sort option: ${sort}`);
      }

      return cards;
    }
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
