import express from "express";
import { CardController } from "../controller/card.controller.js";
import { CardRepository } from "../repository/card.repository.js";
import { CardService } from "../service/card.service.js";

const router = express.Router();

const cardRepository = new CardRepository();
const cardService = new CardService(cardRepository);
const cardController = new CardController(cardService);

export { cardController, router };
