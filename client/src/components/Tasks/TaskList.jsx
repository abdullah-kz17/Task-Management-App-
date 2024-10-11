// src/components/TaskList.jsx
import { Table, Button, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../services/api";

const TaskList = ({ onEdit }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks(); // Refresh tasks after deletion
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? "Completed" : "Pending"),
    },
    {
      title: "Actions",
      render: (task) => (
        <>
          <Button onClick={() => onEdit(task)}>Edit</Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(task._id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return <Table dataSource={tasks} columns={columns} rowKey="_id" />;
};

export default TaskList;
