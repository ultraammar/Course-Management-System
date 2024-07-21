import React, { useState } from "react";
// import api from './api';
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
import axios from "axios";
import AuthorsList from "./components/AdminsRole/AuthorsList/AuthorsList";
import AuthorAdd from "./components/AdminsRole/AuthorAdd/AuthorAdd";
import AuthorUpdate from "./components/AdminsRole/AuthorUpdate/AuthorUpdate";

// Set the base URL of the API
axios.defaults.baseURL = 'https://course-management-system-json-server-data.onrender.com';
// axios.defaults.baseURL = "http://localhost:3000";

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
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/teachers/" exact
              element={<Navigate to="/teachers/manage-courses" replace />}
            />

            <Route
              path="/teachers/manage-courses" exact
              element={
                <ProtectedRoute>
                  <TeacherCoursesList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/teachers/manage-courses/new" exact
              element={
                <ProtectedRoute>
                  <TeacherCoursesAdd />
                </ProtectedRoute>
              }
            />

            <Route
              path="/teachers/course-update/:id" exact
              element={
                <ProtectedRoute>
                  <TeacherCourseUpdate />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admins/" exact
              element={<Navigate to="/admins/manage-authors" replace />}

            />
            <Route
              path="/admins/manage-authors/" exact
              element={
                <ProtectedRoute>
                  <AuthorsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admins/manage-authors/new"
              element={
                <ProtectedRoute>
                  <AuthorAdd />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admins/author-update/:id"
              element={
                <ProtectedRoute>
                  <AuthorUpdate />
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
