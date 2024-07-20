import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { Button, Flex, Layout, Space, Table, theme } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { PlusSquareTwoTone } from "@ant-design/icons";

const TeacherCoursesList = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleUpdate = (record) => {
    localStorage.setItem("update", JSON.stringify(record));
    // setDataToUpdate(record); //do not stringify

    // dispatch(setDataToUpdate(record));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/courses/${id}`).then(() => {
      fetchData();
    });
  };

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/courses");
      const coursesData = response.data;
      const updatedData = await Promise.all(
        coursesData.map(async (item) => {
          const response = await axios.get(
            `http://localhost:3000/users/${item.teacher_id}`
          );
          return {
            ...item,
            assignedTeacher: response.data.email,
          };
        })
      );
      setData(updatedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Ensure data is fetched first
  }, []);

  //table columns
  const columns = [
    { title: "id", dataIndex: "id", key: "id", width: 50 },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "students",
      dataIndex: "students",
      key: "students",
    },
    {
      title: "Assigned Teacher",
      dataIndex: "assignedTeacher",
      key: "assignedTeacher",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/teachers/course-update/${record.id}`}>Edit</Link>
          <Link onClick={() => handleDelete(record.id)}>Delete</Link>
        </Space>
      ),
    },
  ];

  return (
    <Layout
      style={{
        margin: "20px 16px",
        borderRadius: borderRadiusLG,
        // padding: 30,
        background: "linear-gradient(180deg, #000f2e 0%, #001f4b 100%)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Flex gap="small" wrap justify="right">
          <Button type="primary" shape="round" icon={<PlusSquareTwoTone />} size={"large"}>
            <Link to={`/manage-courses/new`}>Add Course</Link>
          </Button>
          
        </Flex>
      <Layout
      style={{
        margin: "20px 0",
        borderRadius: borderRadiusLG,
        padding: 30,
      }}
      >
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.id}
          scroll={{ x: 1000 }}
        />
      </Layout>
    </Layout>
  );
};

export default TeacherCoursesList;
