import { cardController, router } from "./index.js";

router.get("/cards", (req, res) => cardController.getCards(req, res));
router.post("/card", (req, res) => cardController.createCard(req, res));
router.delete("/card/:id", (req, res) => cardController.deleteCard(req, res));
router.put("/card/:id", (req, res) => cardController.updateCard(req, res));

export default router;
