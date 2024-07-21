import React, { useEffect, useState } from "react";
import "./AuthorAdd.scss"
import { Button, Form, Input, Layout, Select, Space, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";


const AuthorAdd = () => {
    const navigate = useNavigate();

    
  
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [form] = Form.useForm();
  
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 6,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 14,
        },
      },
    };
  
    let validationSchema = Yup.object({
      name: Yup.string().required("Needs a name").min(3, "Too Short!"),
      // streetAddress: Yup.string().min(5, "Too Short!").required("Required"),
      // workStatus: Yup.string().notOneOf(["unselected"], "Please select a value"),
    });
  
    const yupSync = {
      async validator({ field }, value) {
        await validationSchema.validateSyncAt(field, { [field]: value });
      },
    };
    
    
  
    const formik = useFormik({
      initialValues: {
        name: "",
      },
      onSubmit: (values) => {
        console.log("onsubmit ran");
        formik.resetForm();
        form.resetFields(); 
  
        //push to db.json
        axios.post("/authors", values).then(() => {
          console.log("Author added");  
          navigate("/admins/manage-authors");
        });
      },
      // validationSchema: validationSchema,
    });
  
  //checking formik values
  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);
      
  


  return (
    <>
      <Content
        style={{
          padding: 24,
          margin: "16px",
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Form
          form={form}
        onFinish={formik.handleSubmit}
          {...formItemLayout}
          variant="filled"
          style={{
            // maxWidth: 600,
            width: "100%",
            }}
          >

            <Form.Item label="Name" name="name" 
            rules={[yupSync]}
            >
            <Input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            </Form.Item>


            
          <Form.Item
            wrapperCol={{
              offset: 0,  
              sm: { offset: 6 }, // large screen: {span: 14}
              span: 14,
            }}
          >
            <Button type="primary" htmlType="submit" block size="large">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </>
  )
}

export default AuthorAdd