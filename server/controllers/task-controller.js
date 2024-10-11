const Task = require("../models/task-model");

// Create a new task
const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const userId = req.user._id; // Get the authenticated user's ID

  try {
    const newTask = await Task.create({
      title,
      description,
      completed: false,
      dueDate,
      userId, // Associate task with the user
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: "Error creating task", error });
  }
};

// Get all tasks for the authenticated user
const getTasks = async (req, res) => {
  const userId = req.user._id; // Get the authenticated user's ID

  try {
    const tasks = await Task.find({ userId }); // Fetch tasks associated with this user
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: "Error fetching tasks", error });
  }
};

// Get a specific task by ID
const getTaskById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id; // Get the authenticated user's ID

  try {
    const task = await Task.findOne({ _id: id, userId }); // Ensure the task belongs to the user
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: "Error fetching task", error });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed, dueDate } = req.body;
  const userId = req.user._id; // Get the authenticated user's ID

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId }, // Ensure the task belongs to the user
      { title, description, completed, dueDate },
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: "Error updating task", error });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id; // Get the authenticated user's ID

  try {
    const task = await Task.findOneAndDelete({ _id: id, userId }); // Ensure the task belongs to the user
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting task", error });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
