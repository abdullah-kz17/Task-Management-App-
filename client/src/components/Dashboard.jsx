// src/pages/Dashboard.jsx
import { useState } from "react";
import TaskList from "../components/Tasks/TaskList";
import TaskForm from "../components/Tasks/TaskForm";
import AppLayout from "../components/Layouts/AppLayout";

const Dashboard = () => {
  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleSuccess = () => {
    setEditingTask(null); // Reset editing task after success
  };

  return (
    <AppLayout>
      <h1>Task Management Dashboard</h1>
      <TaskForm taskToEdit={editingTask} onSuccess={handleSuccess} />
      <TaskList onEdit={handleEditTask} />
    </AppLayout>
  );
};

export default Dashboard;
