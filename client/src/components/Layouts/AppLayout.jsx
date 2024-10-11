// src/components/Layout.jsx
import { Layout, Menu } from "antd";
const { Header, Sider, Content } = Layout;

const AppLayout = ({ children }) => (
  <Layout style={{ minHeight: "100vh" }}>
    <Header style={{ color: "#fff" }}>Task Management</Header>
    <Layout>
      <Sider width={200}>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">Dashboard</Menu.Item>
          {/* You can add more sidebar options */}
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: "24px", margin: 0 }}>{children}</Content>
      </Layout>
    </Layout>
  </Layout>
);

export default AppLayout;
