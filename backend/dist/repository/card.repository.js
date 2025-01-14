"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRepository = void 0;
const Card_1 = require("../models/Card");
class CardRepository {
    getCards(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cards = yield Card_1.Card.findAll();
                return cards;
            }
            catch (error) {
                console.error("Error fetching cards:", error);
                throw error;
            }
        });
    }
    createCard(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const card = yield Card_1.Card.create(req.body);
                const results = yield card.save();
                return results;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteCard(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const card = yield Card_1.Card.findByPk(id);
                if (!card) {
                    throw new Error("Card not found");
                }
                yield card.destroy();
                return "Task deleted successfully";
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateCard(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { content } = req.body;
                const card = yield Card_1.Card.findByPk(id);
                if (!card) {
                    throw new Error("Card not found");
                }
                card.set({ content });
                yield card.save();
                return "Task updated successfully";
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CardRepository = CardRepository;
