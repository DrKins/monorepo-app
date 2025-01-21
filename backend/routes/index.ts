import express from "express";
import { AuthController } from "../controller/auth.controller.js";
import { CardController } from "../controller/card.controller.js";
import { ReactionController } from "../controller/reaction.controller.js";
import { AuthRepository } from "../repository/auth.repository.js";
import { CardRepository } from "../repository/card.repository.js";
import { ReactionRepository } from "../repository/reaction.respository.js";
import { AuthService } from "../service/auth.service.js";
import { CardService } from "../service/card.service.js";
import { ReactionService } from "../service/reaction.service.js";
import { verifyJwt } from "../utils/jwt.js";

const router = express.Router();

// Create instances of repositories, services, and controllers
export const cardRepository = new CardRepository();
const cardService = new CardService(cardRepository);
const cardController = new CardController(cardService);

export const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

export const reactionRepository = new ReactionRepository();
const reactionService = new ReactionService(reactionRepository);
const reactionController = new ReactionController(reactionService);

// Card routes
router.get("/cards", verifyJwt, (req, res) =>
  cardController.getCards(req, res),
);
router.post("/card", verifyJwt, (req, res) =>
  cardController.createCard(req, res),
);
router.put("/reaction/card/:id", verifyJwt, (req, res) =>
  reactionController.addReaction(req, res),
);
router.delete("/card/:id", (req, res) => cardController.deleteCard(req, res));

// Auth routes
router.post("/login", (req, res) => authController.login(req, res));
router.post("/registration", (req, res) => authController.register(req, res));

export { router };
