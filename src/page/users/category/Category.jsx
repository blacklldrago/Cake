import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Table, message } from "antd";
import { Container, IconButton, TextField } from "@mui/material";
import { AddCircle, Delete, Edit } from "@mui/icons-material";

import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { axiosRequest } from "../../../utils/axiosRequest";
import Loader from "../../../components/loader/Loader";
import { useForm } from "antd/es/form/Form";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [formAdd] = useForm();
  const [formEdit] = useForm();
  const [id, setId] = useState(null);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Short Desc",
      dataIndex: "shortDesc",
      key: "shortDesc",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Full Desc",
      dataIndex: "fullDesc",
      key: "fullDesc",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Products Count",
      dataIndex: "productsCount",
      key: "productsCount",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Actions",
      key: "id",
      dataIndex: "id",
      render: (id, row) => {
        return (
          <>
            <IconButton
              sx={{color:"orange"}}
              onClick={() => {
                setEditModal(true);
                setId(id);
                formEdit.setFieldValue("categoryName", row.categoryName);
                formEdit.setFieldValue("shortDesc", row.shortDesc);
                formEdit.setFieldValue("fullDesc", row.fullDesc);
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => {
                setDeleteModal(true);
                setId(id);
              }}
              color="error"
            >
              <Delete />
            </IconButton>
          </>
        );
      },
    },
  ];

  const getCategories = async () => {
    setLoader(true)
    try {
      const { data } = await axiosRequest.get("Category/GetCategories");
      if (data.code !== 200) {
        message.error(data.message);
        return;
      }
      setLoader(false)
      let ans = data.data.filter((e)=>{
        if(e.categoryName.includes("$")){
          return e
        }
      })
      for(let i = 0; i < ans.length; i++){
        if(ans[i].categoryName.includes("$")){
          ans[i].categoryName = ans[i].categoryName.replace("$", "")
        }
      }
      setCategories(ans);
    } catch (e) {
      setLoader(false)
    }
  };

  const addCategory = async (values) => {
    setAddModal(false);
    setLoader(true)
    values.categoryName+="$";
    try {
      const { data } = await axiosRequest.post("Category/AddCategory", values);
      if (data.code !== 200) {
        enqueueSnackbar(data.message, { variant: "error" });
        return;
      }
      enqueueSnackbar(data.message, { variant: "success" });
      getCategories();
      setLoader(false)

    } catch (error) {
      setLoader(false)

    }
  };
  const editCategory = async (values) => {
    setEditModal(false);
    values.id = id;
    values.categoryName+="$";
    setLoader(false)

    try {
      const { data } = await axiosRequest.put(
        `Category/UpdateCategory`,
        values
      );
      
      getCategories();
      setLoader(false)
    } catch (error) {}
  };
  const deleteCategory = async (id) => {
    setLoader(true)
    try {
      const {data} = await axiosRequest.delete(`Category/${id}`);
      getCategories();
      setLoader(false)
    
    } catch (error) {
      setLoader(false)
    }
  };



  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div>
      <div className="categories ">
      <div className="cata pt-[70px]">
        <Container>

        
      <IconButton
        onClick={() => {
          setAddModal(true);
          formAdd.resetFields();
        }}
      >
        <AddCircle 
        sx={{fontSize:30, color:"#2DB84B  "}} />
      </IconButton>
      <Table columns={columns} dataSource={categories} pagination = {false} loading = {loader} />
      <Modal
        title="Add Category"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={false}  
      >
        <Form
          form={formAdd}
          layout="vertical"
          style={{
            width: 370,
            margin:"auto"
          }}
          initialValues={{
            remember : true,
          }}
          onFinish={addCategory}
          autoComplete="off"
        >
          <Form.Item
            label="Category Name"
            name="categoryName"
            rules={[
              {
                required: true,
                message: "Please input your Category Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Short Desc"
            name="shortDesc"
            rules={[
              {
                required: true,
                message: "Please input your Short Desc!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Full Desc"
            name="fullDesc"
            rules={[
              {
                required: true,
                message: "Please input your Full Desc!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Delete Category"
        open={deleteModal}
        onOk={() => {
          setDeleteModal(false);
          deleteCategory(id);
          setId(null);
        }}
        onCancel={() => setDeleteModal(false)}
      >
        Are you sure to delete?
      </Modal>
      <Modal
        title="Edit Category"
        open={editModal}
        onCancel={() => setEditModal(false)}
        footer={false}
      >
        <Form
          form={formEdit}
          layout="vertical"
          style={{
            width: 370,
            margin:"auto"
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={editCategory}
          autoComplete="off"
        >
          <Form.Item
            label="Category Name"
            name="categoryName"
            rules={[
              {
                required: true,
                message: "Please input your Category Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Short Desc"
            name="shortDesc"
            rules={[
              {
                required: true,
                message: "Please input your Short Desc!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Full Desc"
            name="fullDesc"
            rules={[
              {
                required: true,
                message: "Please input your Full Desc!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button  htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <SnackbarProvider />   
      </Container>
      </div>
      
      </div>
    </div>
  );
};

export default Categories;
