import React, { useEffect, useState } from "react";
import "./AuthorsList.scss";
import { Button, Flex, Layout, Space, Table, theme } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { PlusSquareTwoTone } from "@ant-design/icons";
import GenericModal from "../../common/Modal/GenericModal";

const AuthorsList = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // modal options
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  //store deleteMethod i  nto a state
  const [deleteMethod, setDeleteMethod] = useState(null);

  //handleDelete method stores a deleteMethod in the state and sets the isDeleteModalOpen to true
  const handleDelete = (id) => {
    setIsDeleteModalOpen(true);
    setDeleteMethod(() => () => {
      axios.delete(`/authors/${id}`).then(() => {
        fetchData();
      });
    });
  };
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/authors");
      const authorsData = response.data;
      console.log(authorsData);
      setData(authorsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Ensure data is fetched first
  }, []);

  //table columns
  const columns = [
    { title: "id", dataIndex: "id", key: "id", width: 70 },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admins/author-update/${record.id}`}>Edit</Link>
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
        <Link to={`/admins/manage-authors/new`}>
          <Button
            type="primary"
            shape="round"
            icon={<PlusSquareTwoTone />}
            size={"large"}
          >
            Add Author
          </Button>
        </Link>
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
        <GenericModal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          title="Confirmation"
          okMethod={() => deleteMethod()}
        >Are you sure you want to delete this course?</GenericModal>
      </Layout>
    </Layout>
  );
};

export default AuthorsList;
