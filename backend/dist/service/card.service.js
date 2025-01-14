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
exports.CardService = void 0;
class CardService {
    constructor(cardRepository) {
        this.cardRepository = cardRepository;
    }
    getCards(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield this.cardRepository.getCards(req);
                return tasks;
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching tasks" });
            }
        });
    }
    createCard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.cardRepository.createCard(req);
                return task;
            }
            catch (error) {
                res.status(500).json({ message: "Error creating task" });
            }
        });
    }
    deleteCard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.cardRepository.deleteCard(req);
                return task;
            }
            catch (error) {
                res.status(500).json({ message: "Error deleting task" });
            }
        });
    }
    updateCard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.cardRepository.updateCard(req);
                return task;
            }
            catch (error) {
                res.send(500).json({ message: "Error updating task" });
            }
        });
    }
}
exports.CardService = CardService;
