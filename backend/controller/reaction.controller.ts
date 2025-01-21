import type { NextFunction, Request, Response } from "express";
import { ReactionService } from "../service/reaction.service";

export class ReactionController {
  private reactionService: ReactionService;
  constructor(reactionService: ReactionService) {
    this.reactionService = reactionService;
  }

  async addReaction(req: Request, res: Response, next?: NextFunction) {
    try {
      const reaction = await this.reactionService.addReaction(req, res);
      return res.status(200).json(reaction);
    } catch (error) {
      res.status(500).json({ message: "Error adding reaction" });
    }
  }
}
