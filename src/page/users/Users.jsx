import { Container } from "@mui/material";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import { axiosRequest } from "../../utils/axiosRequest";

const Users = () => {
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);
  const getAllusers = async () => {
    setLoader(true);
    try {
      const { data } = await axiosRequest.get("Auth/GetAllUsers");
      setUsers(data);
      setLoader(false);
      console.log(data);
    } catch (error) {
      setLoader(false);
    }
  };
  const columns = [
    {
      title: "Fullname",
      dataIndex: "fullName",
      key: "fullName",
      render: (e, row) => {
        return <h1>{row.fullName}</h1>;
      },
    },
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
      render: (e, row) => {
        return <h1>{row.userName}</h1>;
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (e, row) => {
        return <h1>{row.phone}</h1>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (e, row) => {
        return <h1>{row.email}</h1>;
      },
    },
    {
      title: "User Roles",
      dataIndex: "userRoles",
      key: "userRoles",
      render: (e, row) => {
        return <h1>{row.userRoles}</h1>;
      },
    },
  ];
  useEffect(() => {
    getAllusers();
  }, []);
  return (
    <div>
      <div className="users w-[80%] m-auto mt-[100px]">
        <Container maxWidth="xlg">
          <Table
            dataSource={users}
            loading={loader}
            columns={columns}
            pagination={false}
          />
        </Container>
      </div>

    </div>
  );
};

export default Users;
