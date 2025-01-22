import type { NextFunction, Request, Response } from "express";
import { AuthRepository } from "../repository/auth.repository";
import { comparePassword, hashPassword } from "../utils/hash";
import { signJwt } from "../utils/jwt";
import { loginSchema, registerSchema } from "../validation/auth.validation";

export class AuthService {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async login(req: Request, res: Response, next?: NextFunction) {
    const { email, password } = loginSchema.parse(req.body);
    const user = await this.authRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("Invalid Email Adress");
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      throw new Error("Invalid Password");
    }

    // Payload for the token
    const payload = { id: user.id, email: user.email };

    // Generate JWT
    const token = await signJwt(payload);

    return { payload, token };
  }

  async register(req: Request, res: Response, next?: NextFunction) {
    const { email, password } = registerSchema.parse(req.body);

    const hashedPassword = await hashPassword(password);

    const userAlreadyExists = await this.authRepository.findUserByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    await this.authRepository.createUser({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully" });
    return;
  }
}
