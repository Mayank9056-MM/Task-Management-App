import express from "express";
import {
  createTask,
  deleteTask,
  getUserTasks,
  toggleTask,
  updateTask,
} from "../controllers/task.controller.js";
import { verifyAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyAuth, createTask);
router.patch("/:id", verifyAuth, updateTask);
router.delete("/delete/:id", verifyAuth, deleteTask);
router.get("/", verifyAuth, getUserTasks);
router.patch("/toggle/:id", verifyAuth, toggleTask)

export default router;