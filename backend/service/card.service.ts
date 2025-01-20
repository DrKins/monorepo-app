import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { CardRepository } from "../repository/card.repository";
import { generateErrorResponse } from "../utils/generateErrorResponse";
import { cardSchema } from "../validation/card.validation";

export class CardService {
  private cardRepository: CardRepository;

  constructor(cardRepository: CardRepository) {
    this.cardRepository = cardRepository;
  }

  async getCards(req: Request, res: Response, next?: NextFunction) {
    try {
      const cards = await this.cardRepository.getCards(req);

      return cards;
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json(generateErrorResponse(error.message, true));
        return;
      }
    }
  }

  async addReaction(req: Request, res: Response, next?: NextFunction) {
    try {
      if (req.body) {
        const task = await this.cardRepository.addReaction({
          userId: req?.user?.id,
          cardId: parseInt(req.params.id),
          type: req.body.type,
        });
        return task;
      } else {
        res.status(400).json({ message: "Missing request body" });
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json(generateErrorResponse(error.message, true));
        return;
      }
    }
  }

  async createCard(req: Request, res: Response, next?: NextFunction) {
    try {
      const validatedData = cardSchema.parse(req.body);

      const task = await this.cardRepository.createCard({
        ...validatedData,
        userId: req?.user?.id,
      });
      return task;
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422).json(generateErrorResponse(error.errors));
        return;
      }

      if (error instanceof Error) {
        res.status(500).json(generateErrorResponse(error.message, true));
        return;
      }
    }
  }

  async deleteCard(req: Request, res: Response, next?: NextFunction) {
    try {
      const task = await this.cardRepository.deleteCard(req);
      return task;
    } catch (error) {
      res.status(500).json({ message: "Error deleting task" });
    }
  }
}
