import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import RedirectIfLoggedIn from "./components/ProtectedRoute/RedirectIfLoggedIn";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const App = () => {

  //get isLoggedIn state from redux
  const isLoggedIn = useSelector((state) => state.session.isLoggedIn);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <BrowserRouter>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Navbar/>
        <Layout
          style={{
            background: "linear-gradient(180deg, #000f2e 0%, #001f4b 100%)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {isLoggedIn &&
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div className="demo-logo-vertical" />
            <Sidebar />
          </Sider>
          }
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <RedirectIfLoggedIn>
                  <Login />
                </RedirectIfLoggedIn>
              }
            />
          </Routes>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};
export default App;
