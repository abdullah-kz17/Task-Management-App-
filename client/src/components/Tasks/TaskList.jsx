import React, { useState, useEffect } from "react";
import { List, Card, Tag, Space, Button, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getTasks, deleteTask } from "../services/api";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      message.error("Failed to fetch tasks");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      message.success("Task deleted successfully");
      fetchTasks();
    } catch (error) {
      message.error("Failed to delete task");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdateSuccess = () => {
    setEditingTask(null);
    fetchTasks();
  };

  return (
    <Card title="Tasks">
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item
            actions={[
              <Button
                icon={<EditOutlined />}
                onClick={() => handleEdit(task)}
              />,
              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(task._id)}
                danger
              />,
            ]}
          >
            <List.Item.Meta title={task.title} description={task.description} />
            <Tag
              color={
                task.status === "To Do"
                  ? "red"
                  : task.status === "In Progress"
                  ? "blue"
                  : "green"
              }
            >
              {task.status}
            </Tag>
          </List.Item>
        )}
      />
      {editingTask && (
        <TaskForm
          task={editingTask}
          onSuccess={handleUpdateSuccess}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </Card>
  );
};

export default TaskList;
