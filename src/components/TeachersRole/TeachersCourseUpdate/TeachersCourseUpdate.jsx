import React from "react";
import "./TeachersCourseUpdate.scss";
import { Content } from "antd/es/layout/layout";
import { Layout, theme } from "antd";

const TeachersCourseUpdate = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
    <Layout
    style={{
        background: "linear-gradient(180deg, #000f2e 0%, #001f4b 100%)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
    <Content
      style={{
        padding: 24,
        margin: "16px",
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <h1>Update</h1>
    </Content>
    <Content
      style={{
        padding: 24,
        margin: "16px",
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <h1>Update</h1>
    </Content>
        
    </Layout>
    <Content
      style={{
        padding: 24,
        margin: "16px",
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <h1>Update</h1>
    </Content>
    </>
  );
};

export default TeachersCourseUpdate;
