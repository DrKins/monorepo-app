import type { NextFunction, Request, Response } from "express";
import { AuthRepository } from "../repository/auth.repository";
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export class AuthService {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async login(req: Request, res: Response, next?: NextFunction) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        throw new Error("Validation: Username and password are required");
      }

      if (password.length < 4) {
        throw new Error("Validation: Password must be at least 8 characters");
      }

      const user = await this.authRepository.login(req);
      return user;
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  // async createCard(req: Request, res: Response, next?: NextFunction) {
  //   try {
  //     const task = await this.cardRepository.createCard(req);
  //     return task;
  //   } catch (error) {
  //     res.status(500).json({ message: "Error creating task" });
  //   }
  // }

  // async deleteCard(req: Request, res: Response, next?: NextFunction) {
  //   try {
  //     const task = await this.cardRepository.deleteCard(req);
  //     return task;
  //   } catch (error) {
  //     res.status(500).json({ message: "Error deleting task" });
  //   }
  // }

  // async updateCard(req: Request, res: Response, next?: NextFunction) {
  //   try {
  //     const task = await this.cardRepository.updateCard(req);
  //     return task;
  //   } catch (error) {
  //     res.send(500).json({ message: "Error updating task" });
  //   }
  // }
}
