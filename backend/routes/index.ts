import express from "express";
import { AuthController } from "../controller/auth.controller.js";
import { CardController } from "../controller/card.controller.js";
import { AuthRepository } from "../repository/auth.repository.js";
import { CardRepository } from "../repository/card.repository.js";
import { AuthService } from "../service/auth.service.js";
import { CardService } from "../service/card.service.js";
import { verifyJwt } from "../utils/jwt.js";

const router = express.Router();

// Create instances of repositories, services, and controllers
const cardRepository = new CardRepository();
const cardService = new CardService(cardRepository);
const cardController = new CardController(cardService);

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

// Card routes
router.get("/cards", verifyJwt, (req, res) =>
  cardController.getCards(req, res),
);
router.post("/card", (req, res) => cardController.createCard(req, res));
router.delete("/card/:id", (req, res) => cardController.deleteCard(req, res));
router.put("/card/:id", (req, res) => cardController.updateCard(req, res));

// Auth routes
router.post("/login", (req, res) => authController.login(req, res));
router.post("/registration", (req, res) => authController.register(req, res));

export { router };
