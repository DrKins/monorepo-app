"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./index.js");
index_js_1.router.get("/cards", (req, res) => index_js_1.cardController.getCards(req, res));
index_js_1.router.post("/card", (req, res) => index_js_1.cardController.createCard(req, res));
index_js_1.router.delete("/card/:id", (req, res) => index_js_1.cardController.deleteCard(req, res));
index_js_1.router.put("/card/:id", (req, res) => index_js_1.cardController.updateCard(req, res));
exports.default = index_js_1.router;
