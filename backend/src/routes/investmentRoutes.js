const { Router } = require("express");
const investmentController = require("../controllers/investmentController");
const authMiddleware = require("../middlewares/authMiddleware");
const requireRole = require("../middlewares/roleMiddleware");

const router = Router();

router.use(authMiddleware);

router.get("/", investmentController.getAll);
router.post("/", requireRole("admin"), investmentController.create);
router.delete("/:id", requireRole("admin"), investmentController.remove);

module.exports = router;
