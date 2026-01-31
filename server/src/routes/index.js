import express from "express";
import healthCheckRoutes from "./healthCheck.routes.js";
import userRoutes from "./user.routes.js";
import taskRoutes from "./task.routes.js";

const router = express.Router();

router.use("/health", healthCheckRoutes);
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);

export default router;
