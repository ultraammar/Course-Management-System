import React from "react";
import "./Navbar.scss";
import { Content, Header } from "antd/es/layout/layout";
import { Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/login/isLoggedIn/sessionSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const Dispatch = useDispatch();

  const session = useSelector((state) => state.session);

  const logoutHandle = () => {
    Dispatch(logout());
    navigate("/login");
  };

  return (
    <Header
      style={{
        padding: 15,
        // background: BlurryGradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "1.5rem",
      }}
    >
      <Content
        style={{
          color: "white",
          fontSize: "1.5rem",
          justifyContent: "left",
          display: "flex",
        }}
      >
        {
          <span>
            {session.isLoggedIn ? "Welcome, " + session.email : "Welcome"}
          </span>
        }
      </Content>
      <Content
        style={{
          color: "white",
          fontSize: "1.5rem",
          
          justifyContent: session.isLoggedIn?"center":"right",
          display: "flex",
        }}
      >
        Course Management System
      </Content>
      {session.isLoggedIn && (
        <Content
          style={{
            color: "white",
            fontSize: "1.5rem",
            justifyContent: "right",
            display: "flex",
          }}
        >
          <Menu
            mode="horizontal"
            className="profile-ul"
            disabledOverflow="true"
          >
            <Menu.SubMenu key="profileMenu" icon={<UserOutlined />}>
              <Menu.Item key="Logout" onClick={logoutHandle}>
                Logout
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Content>
      )}
    </Header>
  );
};

export default Navbar;
