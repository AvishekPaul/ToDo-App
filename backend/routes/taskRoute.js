const express = require("express");

const {
  createTask,
  getAllTasks,
  getCurrentUserTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task");

const taskRouter = express.Router();

taskRouter.post("/", createTask);
taskRouter.get("/all", getAllTasks);
taskRouter.get("/mytasks", getCurrentUserTasks);
taskRouter.put("/:taskId", updateTask);
taskRouter.delete("/:taskId", deleteTask);

module.exports = taskRouter;
