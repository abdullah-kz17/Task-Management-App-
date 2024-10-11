import React, { useContext } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

const AppLayout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ color: "white", fontSize: "18px" }}>Task Manager</div>
          <Menu theme="dark" mode="horizontal" selectable={false}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              {user?.name}
            </Menu.Item>
            <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu>
        </div>
      </Header>
      <Content style={{ padding: "24px" }}>{children}</Content>
    </Layout>
  );
};

export default AppLayout;
