import type { Request, Response } from "express";
import { AuthService } from "../service/auth.service";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async login(req: Request, res: Response) {
    const user = await this.authService.login(req, res);
    res.json(user);
  }

  // async createCard(req: Request, res: Response) {
  //   const task = await this.cardService.createCard(req, res);
  //   res.json(task);
  // }

  // async deleteCard(req: Request, res: Response) {
  //   const results = await this.cardService.deleteCard(req, res);
  //   res.json(results);
  // }

  // async updateCard(req: Request, res: Response) {
  //   const results = await this.cardService.updateCard(req, res);
  //   res.json(results);
  // }
}
