import React, { useEffect, useState } from "react";
import "./TeacherCourseUpdate.scss";
import { Content } from "antd/es/layout/layout";
import { Button, Form, Input, Layout, Select, theme } from "antd";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

const TeacherCourseUpdate = () => {

  const [authorOptions, setAuthorOptions] = useState([]);
  const [courseData, setCourseData] = useState({});
  const navigate = useNavigate();
  const { id: updateId } = useParams();

  

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

        //fetch course data using the updateId
        const responseCourse = await axios.get(`/courses/${updateId}`);
        setCourseData(responseCourse.data);
        console.log(responseCourse.data);
        form.setFieldsValue({
          author_id: responseCourse.data.author_id, // Ensure this matches the name and value expected by the Ant Design form
          title: responseCourse.data.title,
          description: responseCourse.data.description,
        });
        formik.setValues({
          title: responseCourse.data.title,
          description: responseCourse.data.description,
          author_id: responseCourse.data.author_id, // Ensure this matches the name and value expected by the Ant Design form
        });
        console.log(formik.values)  
        
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
    author_id: Yup.number().required("You must select an author.").min(1, "Too Short!"),
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
      // formik.resetForm();
      // form.resetFields(); 
      
      //push to db.json
      axios.put(`courses/${updateId}`, values).then(() => {
        console.log("Course updated");  
        
        navigate('/teachers/manage-courses');
      });
    },
    // validationSchema: validationSchema,
  });

     //useEffect console log formik values
  useEffect(()=>{
    console.log(formik.values);
    console.log(authorOptions);
  }
  ,[formik.values]);
  


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
        {courseData &&
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

            <Form.Item label="Author" name="author_id" 
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
              Update
            </Button>
          </Form.Item>
        </Form>
        }
      </Content>
        
    </>
  );
};

export default TeacherCourseUpdate;
