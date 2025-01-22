import express from "express";
import { AuthController } from "../controller/auth.controller";
import { CardController } from "../controller/card.controller";
import { ReactionController } from "../controller/reaction.controller";
import { AuthRepository } from "../repository/auth.repository";
import { CardRepository } from "../repository/card.repository";
import { ReactionRepository } from "../repository/reaction.respository";
import { AuthService } from "../service/auth.service";
import { CardService } from "../service/card.service";
import { ReactionService } from "../service/reaction.service";
import { createJwtMiddleware } from "../utils/jwt";

const router = express.Router();

// Create instances of repositories, services, and controllers
const cardRepository = new CardRepository();
const cardService = new CardService(cardRepository);
const cardController = new CardController(cardService);

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

const reactionRepository = new ReactionRepository();
const reactionService = new ReactionService(reactionRepository, cardRepository);
const reactionController = new ReactionController(reactionService);

const verifyJwt = createJwtMiddleware(authRepository);

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
