import mongoose from "mongoose";
import Task from "../models/task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const userId = req.user._id;

  if (!title || title.trim() === "") {
    throw new ApiError(400, "Title is required");
  }

  const task = await Task.create({
    owner: userId,
    title,
    description: description || "",
  });

  if (!task) {
    throw new ApiError(500, "Task creation failed");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});

export const updateTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;

  if (!mongoose.isValidObjectId(taskId)) {
    throw new ApiError(404, "Invalid task id");
  }

  const taskToUpdate = await Task.findOne({
    _id: taskId,
    owner: req.user._id,
  });

  if (!taskToUpdate) {
    throw new ApiError(404, "Task not found or unauthorized");
  }

  const { title, description } = req.body;

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    {
      title: title ? title : taskToUpdate.title,
      description: description ? description : taskToUpdate.description,
    },
    {
      new: true,
    },
  );

  if (!updatedTask) {
    throw new ApiError(404, "Failed to update task");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, updatedTask, "Task updated successfully"));
});

export const deleteTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;

  if (!mongoose.isValidObjectId(taskId)) {
    throw new ApiError(400, "Invalid task id");
  }

  const deletedTask = await Task.findOneAndDelete({
    _id: taskId,
    owner: req.user._id,
  });

  if (!deletedTask) {
    throw new ApiError(400, "Failed to delete task");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, deletedTask, "Task deleted successfully"));
});

export const getUserTasks = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const allTasks = await Task.find({ owner: userId });

  return res
    .status(200)
    .json(new ApiResponse(200, allTasks, "All tasks fetched successfully"));
});

export const toggleTask = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Object is invalid");
  }

  const taskToToggle = await Task.findOne({
    _id: id,
    owner: req.user._id,
  });

  if (!taskToToggle) {
    throw new ApiError(400, "Toggle task not found");
  }

  taskToToggle.status =
    taskToToggle.status === "completed" ? "pending" : "completed";

  await taskToToggle.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { status: taskToToggle.status },
        "Task status toggle successfully",
      ),
    );
});
