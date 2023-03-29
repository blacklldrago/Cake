import React, { useEffect, useState } from 'react'
import {Col, Form, Input, message, Modal, Row, Button, DatePicker, Checkbox } from 'antd';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { axiosRequest } from '../../../utils/axiosRequest';
import { Container, IconButton} from '@mui/material';
import { Add, AddCircle, Delete, Edit } from '@mui/icons-material';
import { fileToBase64 } from '../../../utils/fileToBase64';
const Product = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async ()=>{
    try {
      const {data} = await axiosRequest.get("Product/GetProducts");
      if(data.code == 200){
        setProducts(data.data)
        console.log(data);
        message.success(data.message)
      }
    } catch (error) {
      
    }
  }
  const addProduct = async (e)=>{
    try {
      const {data} = await axiosRequest.post("Product/AddProduct", e);
      if(data.code == 200){
        getProducts(data);
        console.log(data);
        message.success(data.message)
      }
    } catch (error) {
      
    }
  }
  const deleteProduct = async (id)=>{
    try {
      const {data} = await axiosRequest.delete(`Product/DeleteProduct/${id}`);
      // if(data.code == 200){
        getProducts(data);
      //   console.log(data);
      //   message.success(data.message)
      // }
    } catch (error) {
      
    }
  }

  const handleFormat = (lol)=>{  
    let date = new Date(lol.toString());
    let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let ans = [date.getFullYear(), mnth, day].join("-");
    return ans
  }
  const [form] = Form.useForm()
  const [present, setPresent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [T, setT] = useState(false)
  const showModal = () => {
    setIsModalOpen(true);
  };
  const onFinish = async(e) => {
    e.img = present;
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
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
  },[])
  return<div>
    
    <div className="products">
      <Container>
      <IconButton onClick={()=>showModal()}>
        <AddCircle/>
      </IconButton>
      {
        products.map((e)=>{
          return <div>
            <Card sx={{ width: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
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
                <IconButton>
                  <Edit sx={{color:"orange", fontSize:28}} />
                </IconButton>
              </CardActions>
            </Card>
          </div>
        })
      }
      </Container>
    </div>
    {
      isModalOpen && <><Modal footer= {false} title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
         <Form 
        className="text-left "
        name="basic"
        layout='vertical'
        labelCol={{
            span: 8,
          }}
          form={form}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
          <Input/>
          </Form.Item>
        </Col>
        <Col span={20}>
          <Form.Item
            label="Image"
            name="img"
            rules={[
              {
                required: true,
                message: 'Please put Image!',
              },
            ]}
          >
          <input onChange={handleFile} type="file" name="img" />

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
        
        
        
        </Modal></>
    }
  </div>
  
}
export default Product