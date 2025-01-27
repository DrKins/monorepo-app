import type { NextFunction, Request, Response } from "express";
import { CardRepository } from "../repository/card.repository";
import { cardSchema } from "../validation/card.validation";

type GetCardsTypeProps = {
  search?: string;
  sort?: string;
  page?: number;
  userId: number;
};

export class CardService {
  private limit = 15;
  private cardRepository: CardRepository;

  constructor(cardRepository: CardRepository) {
    this.cardRepository = cardRepository;
  }

  async getCards({ search, sort, page, userId }: GetCardsTypeProps) {
    let cards;
    const pageNumber = page ? page - 1 : 0;
    if (search) {
      cards = await this.cardRepository.searchCards({
        query: search,
        filter: sort,
        userId,
        page: pageNumber,
        limit: this.limit,
      });
    } else {
      cards = await this.cardRepository.getCards({
        userId,
        filter: sort,
        page: pageNumber,
        limit: this.limit,
      });
    }
    if (!cards) throw new Error("Error fetching cards");

    console.log(cards);

    const { count, rows: data } = cards;
    const readyForResponseCards = {
      meta: {
        count,
        currentPage: page ?? 1,
        nextPage: (page ?? 1) + this.limit < count ? (page ?? 1) + 1 : null,
        totalPages: Math.ceil(count / this.limit),
      },
      data,
    };

    return readyForResponseCards;
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
