"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.cardController = void 0;
const express_1 = __importDefault(require("express"));
const card_controller_js_1 = require("../controller/card.controller.js");
const card_repository_js_1 = require("../repository/card.repository.js");
const card_service_js_1 = require("../service/card.service.js");
const router = express_1.default.Router();
exports.router = router;
const cardRepository = new card_repository_js_1.CardRepository();
const cardService = new card_service_js_1.CardService(cardRepository);
const cardController = new card_controller_js_1.CardController(cardService);
exports.cardController = cardController;
