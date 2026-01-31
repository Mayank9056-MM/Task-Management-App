import express from "express";
import healthCheckRoutes from "./healthCheck.routes.js";

const router = express.Router();

router.use("/health", healthCheckRoutes);

export default router;
