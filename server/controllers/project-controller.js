const Project = require("../models/project-model");

// Create project
const createProject = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user._id;

  try {
    const newProject = await Project.create({ name, description, userId });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: "Error creating project", error });
  }
};

// Get All projects
const getProjects = async (req, res) => {
  const userId = req.user._id;

  try {
    const projects = await Project.find({ userId });
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ message: "Error fetching projects", error });
  }
};

// Get Project by id
const getProjectById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const project = await Project.findOne({ _id: id, userId });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: "Error fetching project", error });
  }
};

// Update project by id
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const userId = req.user._id;

  try {
    const project = await Project.findOneAndUpdate(
      { _id: id, userId },
      { name, description },
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: "Error updating project", error });
  }
};

// Delete project by id
const deleteProject = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const project = await Project.findOneAndDelete({ _id: id, userId });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting project", error });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
