const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/project-controller");
const authMiddleware = require("../middleware/auth-middleware");

router
  .route("/")
  .post(authMiddleware, createProject) // Create a new project
  .get(authMiddleware, getProjects); // Get all projects

router
  .route("/:id")
  .get(authMiddleware, getProjectById) // Get a single project by its ID
  .put(authMiddleware, updateProject) // Update a project by its ID
  .delete(authMiddleware, deleteProject); // Delete a project by its ID

module.exports = router;
