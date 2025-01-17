import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AuthRepository } from "../repository/auth.repository";
import { generateErrorResponse } from "../utils/generateErrorResponse";
import { signJwt } from "../utils/jwt";
import { loginSchema, registerSchema } from "../validation/auth.validation";

export class AuthService {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async login(req: Request, res: Response, next?: NextFunction) {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const user = await this.authRepository.findUserByEmail(email);

      if (!user || user.password !== password) {
        throw new Error("Invalid email or password");
      }
      // Payload for the token
      const payload = { id: user.id, email: user.email };

      // Generate JWT
      const token = await signJwt(payload);

      return { payload, token };
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ errors: error.errors });
        return;
      }

      if (error instanceof Error) {
        res.status(400).json(generateErrorResponse(error.message));
        return;
      }

      res.send(500).json({ message: "Internal server error" });
    }
  }

  async register(req: Request, res: Response, next?: NextFunction) {
    try {
      const { email, password } = registerSchema.parse(req.body);
      const userAlreadyExists = await this.authRepository.findUserByEmail(
        email,
      );

      if (userAlreadyExists) {
        throw new Error("Email address is already in use");
      }

      await this.authRepository.createUser({
        email,
        password,
      });
      return "User created successfully";
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ errors: error.errors });
        return;
      }

      if (error instanceof Error) {
        res.status(400).json(generateErrorResponse(error.message));
        return;
      }

      res.send(500).json({ message: "Internal server error" });
    }
  }
}
