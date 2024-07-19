import React, { useEffect } from "react";
import "./Login.scss";
import { Content } from "antd/es/layout/layout";
import LoginForm from "../../components/LoginForm/LoginForm";

import { useNavigate } from "react-router-dom";
import { theme } from "antd";
// import LineBlob from "../../assets/line-blob.svg";

const Login = () => {
  const navigate = useNavigate();

  // const isLoggedIn = localStorage.getItem('loggedIn') === 'true'? true: false;
  const isLoggedIn = false;
  console.log(isLoggedIn);
  if (isLoggedIn) {
    navigate("/");
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content
      style={{
        margin: "0 16px",
      }}
    >
      <div
        className="site-layout-content"
        style={{
          marginTop: "16px",
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ marginBottom: "50px" }}>Login Page</h1>
        <LoginForm />
      </div>
    </Content>
  );
};

export default Login;
