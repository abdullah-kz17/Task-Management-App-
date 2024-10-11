import React, { useState, useEffect } from "react";
import { Row, Col, Spin } from "antd";
import TaskList from "./Tasks/TaskList";
import TaskForm from "./Tasks/TaskForm";
import { getTasks } from "./services/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Row gutter={24}>
      <Col span={16}>
        <TaskList tasks={tasks} onTasksChange={fetchTasks} />
      </Col>
      <Col span={8}>
        <TaskForm onSuccess={fetchTasks} />
      </Col>
    </Row>
  );
};

export default Dashboard;
