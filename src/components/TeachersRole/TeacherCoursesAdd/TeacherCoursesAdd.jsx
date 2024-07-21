import { Button, Form, Input, Layout, Select, Space, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import axios from "axios";





const TeacherCoursesAdd = () => {
  const [authorOptions, setAuthorOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get("/authors");
        const authorsData = response.data;
        console.log(authorsData);

        //set authorOptions array with value key as the id and label as the name
        authorsData.map((author) => {
          author.value = author.id;
          author.label = author.name;
          delete author.id;
          delete author.name;
        });
        setAuthorOptions(authorsData);
        
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Ensure data is fetched first
  },[]);


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
    title: Yup.string().required("Needs a title").min(2, "Too Short!"),
    description: Yup.string().required("At least say something").min(10, "Too Short!"),
    author: Yup.number().required("You must select an author.").min(1, "Too Short!"),
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
      title: "",
      author_id: "",
      description: "",
    },
    onSubmit: (values) => {
      console.log("onsubmit ran");
      formik.resetForm();
      form.resetFields(); 

      //push to db.json
      axios.post("/courses", values).then(() => {
        console.log("Course added");  
        navigate('/teachers/manage-courses');
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

            <Form.Item label="Title" name="title" 
            rules={[yupSync]}
            >
            <Input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            </Form.Item>

            <Form.Item label="Description" name="description" 
            rules={[yupSync]}
            > 
            <Input
              id="description"
              name="description"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.description} 
            />

            </Form.Item>

            <Form.Item label="Author" name="author" 
            rules={[yupSync]}
            
            >
            <Select
              placeholder="Please select a value" 
              options={authorOptions} 
              onChange={(value) => formik.setFieldValue("author_id", value)}
              value={formik.values.author_id}
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
  );
};

export default TeacherCoursesAdd;
