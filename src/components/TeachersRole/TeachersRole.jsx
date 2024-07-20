import { theme } from 'antd';
import { Content } from 'antd/es/layout/layout'
import React from 'react'


const TeachersRole = () => {
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
        style={{
          marginTop: "16px",
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        Teacher courses table
      </div>
    </Content>
  )
}

export default TeachersRole