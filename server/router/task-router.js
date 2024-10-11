const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");
const taskController = require("../controllers/task-controller");

router
  .route("/")
  .post(authMiddleware, taskController.createTask)
  .get(authMiddleware, taskController.getTasks);

router
  .route("/:id")
  .get(authMiddleware, taskController.getTaskById)
  .put(authMiddleware, taskController.updateTask)
  .delete(authMiddleware, taskController.deleteTask);

module.exports = router;
