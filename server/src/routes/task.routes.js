import express from "express";
import {
  createTask,
  deleteTask,
  getUserTasks,
  updateTask,
} from "../controllers/task.controller.js";
import { verifyAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyAuth, createTask);
router.patch("/:id", verifyAuth, updateTask);
router.delete("/:id".verifyAuth, deleteTask);
router.get("/", verifyAuth, getUserTasks);

export default router;