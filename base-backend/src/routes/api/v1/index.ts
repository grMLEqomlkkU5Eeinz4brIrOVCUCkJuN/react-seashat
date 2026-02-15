import { Router } from "express";
import healthRoutes from "./health.routes";
import wordRoutes from "./word.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/words", wordRoutes);

export default router;
