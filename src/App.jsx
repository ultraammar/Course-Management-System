import React, { useState } from "react";
import { Layout, theme } from "antd";
import Sidebar from "./components/Sidebar/Sidebar";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import RedirectIfLoggedIn from "./components/ProtectedRoute/RedirectIfLoggedIn";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import TeacherCoursesList from "./components/TeachersRole/TeacherCoursesList/TeacherCoursesList";
import TeacherCoursesAdd from "./components/TeachersRole/TeacherCoursesAdd/TeacherCoursesAdd";
import TeacherCourseUpdate from "./components/TeachersRole/TeacherCourseUpdate/TeacherCourseUpdate";
const { Sider } = Layout;

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
        <Navbar />
        <Layout
          style={{
            background: "linear-gradient(180deg, #000f2e 0%, #001f4b 100%)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {isLoggedIn && (
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
            >
              <div className="demo-logo-vertical" />
              <Sidebar />
            </Sider>
          )}
          <Routes>
            <Route path="/" element={<Navigate to="/teachers/" replace />} />
            <Route
              path="/teachers/"
              element={<Navigate to="/teachers/manage-courses" replace />}
            />

            <Route
              path="/teachers/manage-courses"
              element={
                <ProtectedRoute>
                  <TeacherCoursesList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/teachers/manage-courses/new"
              element={
                <ProtectedRoute>
                  <TeacherCoursesAdd />
                </ProtectedRoute>
              }
            />

            <Route
              path="/teachers/course-update/:id"
              element={
                <ProtectedRoute>
                  <TeacherCourseUpdate />
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
