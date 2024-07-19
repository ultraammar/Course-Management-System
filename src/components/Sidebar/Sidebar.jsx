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

const Sidebar = () => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState("/");

  const isLoggedIn = localStorage.getItem("loggedIn") === "true" ? true : false;

  const onClick = (e) => {
    console.log("click ", e);
  };

  const logoutHandle = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="vertical"
      className="nav-ul"
      theme="dark"
      disabledOverflow="false"
    >
      <Menu.Item key="/" icon={<HomeOutlined />}>
        <Link to="/">Courses</Link>
      </Menu.Item>
      <Menu.Item key="course_add" icon={<FileAddOutlined/>}>
        <Link to="/login" rel="noopener noreferrer">
          Add Course
        </Link>
      </Menu.Item>
      <Menu.Item key="innovation" icon={<InfoCircleOutlined/>}>
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Account Info
        </a>
      </Menu.Item>
    </Menu>
  );
};
export default Sidebar;
