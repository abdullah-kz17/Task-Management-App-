import React, { useState } from "react";
import { List, Card, Tag, Button, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteTask } from "../services/api";
import TaskForm from "./TaskForm";

const TaskList = ({ tasks, onTasksChange }) => {
  const [editingTask, setEditingTask] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      message.success("Task deleted successfully");
      onTasksChange();
    } catch (error) {
      message.error("Failed to delete task");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdateSuccess = () => {
    setEditingTask(null);
    onTasksChange();
  };

  return (
    <Card title="Tasks">
      <List
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
