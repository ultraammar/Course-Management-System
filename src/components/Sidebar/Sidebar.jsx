import React, { useState } from "react";
import {
  AppstoreOutlined,
  FileAddOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  MailOutlined,
  ProductOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState("/");

  const session = useSelector((state) => state.session);

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const logoutHandle = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* the AdminsRole Sidebar */}
      {session.userType === "admin" && (
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="vertical"
          className="nav-ul"
          theme="dark"
          disabledOverflow="false"
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/admins/manage-authors">Authors</Link>
          </Menu.Item>
          <Menu.Item key="author_add" icon={<FileAddOutlined />}>
            <Link to="/admins/manage-authors/new" rel="noopener noreferrer">
              Add Author
            </Link>
          </Menu.Item>
          <Menu.Item key="innovation" icon={<InfoCircleOutlined />}>
            <Link
              href="#"
              // target="_blank"
              rel="noopener noreferrer"
            >
              Account Info
            </Link>
          </Menu.Item>
        </Menu>
      )}

      {/* the TeachersRole Sidebar */}

      {session.userType === "teacher" && (
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="vertical"
        className="nav-ul"
        theme="dark"
        disabledOverflow="false"
      >
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link to="/teachers/manage-courses">Courses</Link>
        </Menu.Item>
        <Menu.Item key="course_add" icon={<FileAddOutlined />}>
          <Link to="/teachers/manage-courses/new" rel="noopener noreferrer">
            Add Course
          </Link>
        </Menu.Item>
        <Menu.Item key="innovation" icon={<InfoCircleOutlined />}>
          <Link
            href="#"
            // target="_blank"
            rel="noopener noreferrer"
          >
            Account Info
          </Link>
        </Menu.Item>
      </Menu>
      )}
    </>
  );
};
export default Sidebar;
