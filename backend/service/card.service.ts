import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { CardRepository } from "../repository/card.repository";
import { CustomRequest } from "../types/Request";
import { generateErrorResponse } from "../utils/generateErrorResponse";
import { cardSchema } from "../validation/card.validation";

export class CardService {
  private cardRepository: CardRepository;

  constructor(cardRepository: CardRepository) {
    this.cardRepository = cardRepository;
  }

  async getCards(req: Request, res: Response, next?: NextFunction) {
    try {
      const tasks = await this.cardRepository.getCards();
      return tasks;
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json(generateErrorResponse(error.message, true));
        return;
      }
    }
  }

  async createCard(req: CustomRequest, res: Response, next?: NextFunction) {
    try {
      const validatedData = cardSchema.parse(req.body);

      const task = await this.cardRepository.createCard({
        ...validatedData,
        userEmail: req.user.email,
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

  async updateCard(req: Request, res: Response, next?: NextFunction) {
    try {
      const task = await this.cardRepository.updateCard(req);
      return task;
    } catch (error) {
      res.send(500).json({ message: "Error updating task" });
    }
  }
}
