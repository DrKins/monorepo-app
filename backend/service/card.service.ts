import type { NextFunction, Request, Response } from "express";
import { CardRepository } from "../repository/card.repository";

export class CardService {
  private cardRepository: CardRepository;

  constructor(cardRepository: CardRepository) {
    this.cardRepository = cardRepository;
  }

  async getCards(req: Request, res: Response, next?: NextFunction) {
    try {
      const tasks = await this.cardRepository.getCards(req);
      return tasks;
    } catch (error) {
      res.status(500).json({ message: "Error fetching tasks" });
    }
  }

  async createCard(req: Request, res: Response, next?: NextFunction) {
    try {
      const task = await this.cardRepository.createCard(req);
      return task;
    } catch (error) {
      res.status(500).json({ message: "Error creating task" });
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
