import React, { useEffect, useState } from 'react'
import {Col, Form, Input, message, Modal, Row, Button, DatePicker, Checkbox, Select, Menu } from 'antd';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { axiosRequest } from '../../../utils/axiosRequest';
import { Container, Grid, IconButton} from '@mui/material';
import { Add, AddCircle, Delete, Edit } from '@mui/icons-material';
import { fileToBase64 } from '../../../utils/fileToBase64';
import { useForm } from 'antd/es/form/Form';
import Loader from '../../../components/loader/Loader';
const Product = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [formEdit] = useForm();
  const [id, setId] = useState(null);

  
  const [form] = Form.useForm()
  const [present, setPresent] = useState("");
  const [present1, setPresent1] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [T, setT] = useState(false)
  
  const [cat, setCat] = useState([]);
  const getProducts = async ()=>{ 
    setLoader(true)
    try {
      const {data} = await axiosRequest.get("Product/GetProducts");
      if(data.code == 200){
        let ans = data.data.filter((e)=>{
          if(e.categoryName.includes("$")){
            return e
          }
        })          
        console.log(ans);
        message.success(data.message)
        setProducts(ans)
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
    }
  }
  const addProduct = async (e)=>{
    setLoader(true)
    try {
      const {data} = await axiosRequest.post("Product/AddProduct", e);
      if(data.code == 200){
        getProducts(data);
        console.log(data);
        message.success(data.message)
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
    }
  }
  const deleteProduct = async (id)=>{
    setLoader(true)
    try {
      const {data} = await axiosRequest.delete(`Product/DeleteProduct?id=${id}`);
      getProducts(data);
      setLoader(false)
    } catch (error) {
      setLoader(false)
    }
  }
  const handleFormat = (lol)=>{  
    let date = new Date(lol.toString());
    let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let ans = [date.getFullYear(), mnth, day].join("-");
    return ans
  }
  const  getCategories =  async()=>{
    try {
      const{data} = await axiosRequest.get(`Category/GetCategories`)
      let ans = data.data.filter((e)=>{
        if(e.categoryName.includes("$")){
          return e
        }
      })          
      setCat(ans);
    } catch (error) {
      
    }
  }
  const editProduct = async (values) => {
    setEditModal(false);
    setLoader(true)
    values.id = id
    console.log(id);
    values.image = present1;
    try {
      const { data } = await axiosRequest.put(
        `Product/UpdateProduct`,
        values
        );
      getProducts();
      setLoader(false)
    }
    catch (error) {}
  };


  const showModal = () => {
    setIsModalOpen(true);
  };
  const onFinish = async(e) => {
    e.image = present;
    e.availableProduct = T;
    e.productionDate = handleFormat(e["productionDate"])
    console.log("Success:", e);
    addProduct(e);
    form.resetFields();
    setIsModalOpen(false);
  };
  const handleFile = async (e) => {
    let file = await fileToBase64(e.target.files[0]);
    setPresent(file)
  };
  const handleFile1 = async (e) => {
    let file = await fileToBase64(e.target.files[0]);
    setPresent1(file)
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  useEffect(()=>{
    getProducts();
    getCategories();
  },[])
  return<div>
    
    <div className="products pt-[90px] justify-center flex">
      <Container>
      <IconButton onClick={()=>showModal()}>
        <AddCircle sx={{fontSize:30, color:"#2DB84B  "}}/>
      </IconButton>
      {
        products.map((e)=>{
          return <div>
            <Grid container spacing={2}>
              <Grid item xs={2} lg = {5}>
                <Card sx={{width: 345}} >
              <CardMedia 
                sx={{ height: 140}}
                image={e["image"]}
                title="green iguana"
                alt = "photo"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {e.productName}
                </Typography>
                <Typography sx={{marginBottom:1}} variant="body1" color="text.secondary">
                  {e.shortDesc}
                </Typography>
                <Typography sx={{marginBottom:1}} variant="body2" color="text.secondary">
                  {e.fullDesc}
                </Typography>
                <Typography>
                  Price: {e.price}$
                </Typography>
                <Typography>
                  Production Date: {handleFormat(e["productionDate"])}
                </Typography>
                <Typography>
                  Product Left: {e["quantity"]}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={()=>deleteProduct(e.id)}>
                  <Delete color='error' sx={{fontSize:30}}/>
                </IconButton>
                <IconButton
                  sx={{color:"orange"}}
                  onClick={() => {
                    setEditModal(true);
                    setId(e.id);

                    formEdit.setFieldValue("productName", e.productName);
                    formEdit.setFieldValue("shortDesc", e.shortDesc);
                    formEdit.setFieldValue("fullDesc", e.fullDesc);
                    formEdit.setFieldValue("price", e.price);
                    formEdit.setFieldValue("quantity", e.quantity);
                    formEdit.setFieldValue("manafacturer", e.manafacturer);
                    formEdit.setFieldValue("availableProduct", e.availableProduct);
                    formEdit.setFieldValue("categoryId", e.categoryId);
                    formEdit.setFieldValue("furnitureMadeOf", e.furnitureMadeOf);
                  }}
                >
                  <Edit />
               </IconButton>
              </CardActions>
                </Card>
              </Grid>
            </Grid>
          </div>
        })
      }
      </Container>
    </div>
    {
      isModalOpen && <Modal footer= {false} title="Add Product"  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form 
        layout='vertical'
          form={form}
          style={{
            width: 400,
            margin:"auto"
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[10, 0]}>
            <Col span={20}>
              <Form.Item
                label="Product Name"
                name="productName"
                rules={[
                  {
                    required: true,
                    message: 'Please put Product Name!',
                  },
                ]}
              >
              <Input/>

              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Short Description"
                name="shortDesc"
                rules={[
                  {
                    required: true,
                    message: 'Please put Short Description!',
                  },
                ]}
              >
              <Input/>

              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Full Description"
                name="fullDesc"
                rules={[
                  {
                    required: true,
                    message: 'Please put Full Description!',
                  },
                ]}
              >
              <Input/>

              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Production Date"
                name="productionDate"
                rules={[
                  {
                    required: true,
                    message: 'Please put Production Date',
                  },
                ]}
              >
              <DatePicker/>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Made Of"
                name="furnitureMadeOf"
                rules={[
                  {
                    required: true,
                    message: 'Please put Production Made Of',
                  },
                ]}
              >
              <Input/>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: 'Please put Price',
                  },
                ]}
              >
              <Input/>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: 'Please put Quantity',
                  },
                ]}
              >
              <Input/>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Manafacturer"
                name="manafacturer"
                rules={[
                  {
                    required: true,
                    message: 'Please put Manafacturer',
                  },
                ]}
              >
              <Input/>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Available Product"
                name="availableProduct"
              >
              <Checkbox name='availableProduct' onClick={()=>setT(!T)}/>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Category Id"
                name="categoryId"
                rules={[
                  {
                    required: true,
                    message: 'Please put Category ID',
                  },
                ]}
              >          
              <Select name="categoryId" placeholder="Select Category">
                {cat.map((elem) => {
                  return (
                    <Menu value={elem.id} key={elem.id}>
                      {elem.id}
                    </Menu>
                  );
                })}
              </Select>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Image"
                name="image"
                rules={[
                  {
                    required: true,
                    message: 'Please put Image!',
                  },
                ]}
              >
              <input onChange={handleFile} type="file" name="image" />

              </Form.Item>
            </Col>
            
            <Col  span={24}>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button style={{background: ""}}  htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    }
    <Modal
        title="Edit Product"
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
          onFinish={editProduct}
          autoComplete="off"
        >
          <Row gutter={[10, 0]}>
            <Col span={20}>
              <Form.Item
                label="Product Name"
                name="productName"
                rules={[
                  {
                    required: true,
                    message: 'Please put Product Name!',
                  },
                ]}
              >
              <Input/>

              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Short Description"
                name="shortDesc"
                rules={[
                  {
                    required: true,
                    message: 'Please put Short Description!',
                  },
                ]}
              >
              <Input/>

              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Full Description"
                name="fullDesc"
                rules={[
                  {
                    required: true,
                    message: 'Please put Full Description!',
                  },
                ]}
              >
              <Input/>

              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Production Date"
                name="productionDate"
                rules={[
                  {
                    required: true,
                    message: 'Please put Production Date',
                  },
                ]}
              >
              <DatePicker/>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Made Of"
                name="furnitureMadeOf"
                rules={[
                  {
                    required: true,
                    message: 'Please put Production Made Of',
                  },
                ]}
              >
              <Input/>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: 'Please put Price',
                  },
                ]}
              >
              <Input/>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: 'Please put Quantity',
                  },
                ]}
              >
              <Input/>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Manafacturer"
                name="manafacturer"
                rules={[
                  {
                    required: true,
                    message: 'Please put Manafacturer',
                  },
                ]}
              >
              <Input/>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Available Product"
                name="availableProduct"
              >
              <Checkbox name='availableProduct' onClick={()=>setT(!T)}/>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Category Id"
                name="categoryId"
                rules={[
                  {
                    required: true,
                    message: 'Please put Category ID',
                  },
                ]}
              >          
              <Select name="categoryId" placeholder="Select Category">
                {cat.map((elem) => {
                  return (
                    <Menu value={elem.id} key={elem.id}>
                      {elem.id}
                    </Menu>
                  );
                })}
              </Select>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Image"
                name="image"
                rules={[
                  {
                    required: true,
                    message: 'Please put Image!',
                  },
                ]}
              >
              <input onChange={handleFile1} type="file" name="image" />

              </Form.Item>
            </Col>
            
            <Col  span={24}>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button style={{background: ""}}  htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
    </Modal>
    {
      loader && <Loader/>
    }
  </div>
  
}
export default Product