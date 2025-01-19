import type { Request, Response } from "express";
import { CardService } from "../service/card.service";
import { CustomRequest } from "../types/Request";

export class CardController {
  private cardService: CardService;

  constructor(cardService: CardService) {
    this.cardService = cardService;
  }

  async getCards(req: Request, res: Response) {
    const tasks = await this.cardService.getCards(req, res);
    res.json(tasks);
  }

  async createCard(req: CustomRequest, res: Response) {
    const task = await this.cardService.createCard(req, res);
    res.json(task);
  }

  async deleteCard(req: Request, res: Response) {
    const results = await this.cardService.deleteCard(req, res);
    res.json(results);
  }

  async updateCard(req: Request, res: Response) {
    const results = await this.cardService.updateCard(req, res);
    res.json(results);
  }
}
