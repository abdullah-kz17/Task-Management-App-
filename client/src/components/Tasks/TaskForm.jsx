import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { createTask, updateTask } from "../services/api";

const { Option } = Select;

const TaskForm = ({ task, onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (task) {
        await updateTask(task._id, values);
        message.success("Task updated successfully");
      } else {
        await createTask(values);
        message.success("Task created successfully");
      }
      form.resetFields();
      if (onSuccess) onSuccess();
    } catch (error) {
      message.error("Failed to save task");
    }
    setLoading(false);
  };

  return (
    <Form
      form={form}
      name="task"
      onFinish={onFinish}
      initialValues={task || {}}
      layout="vertical"
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please input the task title!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          { required: true, message: "Please input the task description!" },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: "Please select the task status!" }]}
      >
        <Select>
          <Option value="To Do">To Do</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Done">Done</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {task ? "Update Task" : "Create Task"}
        </Button>
        {task && (
          <Button onClick={onCancel} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
