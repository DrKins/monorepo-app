import type { Request, Response } from "express";
import { ZodError } from "zod";
import { CardService } from "../service/card.service";
import { generateErrorResponse } from "../utils/generateErrorResponse";

export class CardController {
  private cardService: CardService;

  constructor(cardService: CardService) {
    this.cardService = cardService;
  }

  async getCards(req: Request, res: Response) {
    try {
      const { search } = req.query;
      console.log("THIS IS SEARCH: ", search);
      const searchValue = Array.isArray(search)
        ? search.join(" ")
        : (search as string);

      const userId = req?.user?.id;
      const tasks = await this.cardService.getCards({
        search: searchValue,
        userId,
      });
      res.json(tasks);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json(generateErrorResponse(error.message, true));
        return;
      }
    }
  }

  async createCard(req: Request, res: Response) {
    try {
      const task = await this.cardService.createCard(req, res);
      res.json(task);
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

  async deleteCard(req: Request, res: Response) {
    try {
      const results = await this.cardService.deleteCard(req, res);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Error deleting task" });
    }
  }
}
