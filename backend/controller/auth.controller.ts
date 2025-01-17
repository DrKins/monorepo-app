import type { Request, Response } from "express";
import { AuthService } from "../service/auth.service";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async login(req: Request, res: Response) {
    const token = await this.authService.login(req, res);
    res.json(token);
  }

  async register(req: Request, res: Response) {
    const response = await this.authService.register(req, res);
    res.json(response);
  }
}
