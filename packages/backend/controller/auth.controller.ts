import type { Request, Response } from "express";
import { ZodError } from "zod";
import { AuthService } from "../service/auth.service";
import { generateErrorResponse } from "../utils/generateErrorResponse";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async login(req: Request, res: Response) {
    try {
      const token = await this.authService.login(req, res);
      res.json(token);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ errors: error.errors });
        return;
      }

      if (error instanceof Error) {
        res.status(400).json(generateErrorResponse(error.message, true));
        return;
      }

      res.send(500).json({ message: "Internal server error" });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const response = await this.authService.register(req, res);
      res.json(response);
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
}
