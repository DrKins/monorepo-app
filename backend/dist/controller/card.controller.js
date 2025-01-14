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
exports.CardController = void 0;
class CardController {
    constructor(cardService) {
        this.cardService = cardService;
    }
    getCards(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.cardService.getCards(req, res);
            res.json(tasks);
        });
    }
    createCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.cardService.createCard(req, res);
            res.json(task);
        });
    }
    deleteCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.cardService.deleteCard(req, res);
            res.json(results);
        });
    }
    updateCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.cardService.updateCard(req, res);
            res.json(results);
        });
    }
}
exports.CardController = CardController;
