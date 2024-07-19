import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "./LoginForm.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "../../features/login/isLoggedIn/sessionSlice";

// const loginCredentials = [
//   {
//     email: "ammar@admin.com",
//     password: "admin",
//     user_type: "admin",
//   },
//   {
//     email: "ammar.waheed@teacher.com",
//     password: "teacher",
//     user_type: "teacher",
//   },
// ];
const LoginForm = () => {
  const dispatch = useDispatch();
  //use the useSelector hook to get the value of isLoggedIn redux state

  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);
    const response = await fetch("https://course-management-system-json-server-data.onrender.com/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const loginCredentials = await response.json();
    const matchedCredentials = loginCredentials.find(
      (cred) =>
        cred.email === values.email &&
        cred.password === values.password 
    );

      console.log("Matched credentials:", matchedCredentials);
      if (matchedCredentials) {
        // set the boolean in redux state
        dispatch(setSession({ userType: matchedCredentials.user_type, isLoggedIn: true, email: matchedCredentials.email}));

        

        // useNavigate to route to home page
        navigate("/");
      } else {
        console.log("Invalid credentials");
      }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  //put the boolean in localstorage
  // localStorage.setItem("loggedIn", loggedIn);

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, width: "100%" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="login-form"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
