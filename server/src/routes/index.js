import express from "express";
import healthCheckRoutes from "./healthCheck.routes.js";
import userRoutes from "./user.routes.js";

const router = express.Router();

router.use("/health", healthCheckRoutes);
router.use("/users", userRoutes);

export default router;
