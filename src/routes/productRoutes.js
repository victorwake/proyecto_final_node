import { Router } from "express";
import * as productsController from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, productsController.getAll);
router.get("/:id", authMiddleware, productsController.getById);
router.post("/create", authMiddleware, productsController.create);
router.put("/:id", authMiddleware, productsController.update);
router.delete("/:id", authMiddleware, productsController.remove);

export default router;
