// src/components/TaskForm.jsx
import { Form, Input, Button, Switch } from "antd";
import { useState, useEffect } from "react";
import { createTask, updateTask } from "../services/api";

const TaskForm = ({ taskToEdit, onSuccess }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (taskToEdit) {
      form.setFieldsValue(taskToEdit);
    }
  }, [taskToEdit, form]);

  const handleSubmit = async (values) => {
    if (taskToEdit) {
      await updateTask(taskToEdit._id, values);
    } else {
      await createTask(values);
    }
    onSuccess();
    form.resetFields(); // Clear the form after success
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input placeholder="Task Title" />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea placeholder="Task Description" />
      </Form.Item>

      <Form.Item name="status" label="Completed" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        {taskToEdit ? "Update Task" : "Create Task"}
      </Button>
    </Form>
  );
};

export default TaskForm;
