import React, { useEffect, useState } from "react";
import "./AuthorUpdate.scss";
import { Content } from "antd/es/layout/layout";
import { Button, Form, Input, Layout, Select, theme } from "antd";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

const AuthorUpdate = () => {
  const [authorData, setAuthorData] = useState({});
  const navigate = useNavigate();
  const { id: updateId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/authors");
        const authorsData = response.data;
        console.log(authorsData);

        //fetch author data using the updateId
        const responseAuthor = await axios.get(`/authors/${updateId}`);
        setAuthorData(responseAuthor.data);
        console.log(responseAuthor.data);
        form.setFieldsValue({
          name: responseAuthor.data.name,
        });
        formik.setValues({
          name: responseAuthor.data.name,
        });
        console.log(formik.values);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Ensure data is fetched first
  }, []);

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
    name: Yup.string().required("Needs a title").min(2, "Too Short!"),
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
      axios.put(`authors/${updateId}`, values).then(() => {
        console.log("Author updated");

        navigate("/admins/manage-authors");
      });
    },
    // validationSchema: validationSchema,
  });

  //useEffect console log formik values
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
        {authorData && (
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
            <Form.Item label="Name" name="name" rules={[yupSync]}>
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
                Update
              </Button>
            </Form.Item>
          </Form>
        )}
      </Content>
    </>
  );
};

export default AuthorUpdate;
