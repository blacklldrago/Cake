import React from 'react'
import './Login.css'
import CakeIcon from '@mui/icons-material/Cake';

import { Button, Checkbox, Form, Input } from 'antd';
import { axiosLogin, saveToken } from '../../utils/axiosRequest';
import { useNavigate } from 'react-router-dom';
const Login = () => {

  const [form] = Form.useForm()
  const navigate = useNavigate()
  const onFinish = async(values) => {
    console.log('Success:', values);
      try {
          const{data} = await axiosLogin.post("login",values)
          saveToken(data.accessToken)
          navigate("/")

    } catch (error) {
    } 
    
    // form.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="main ">
        <div className="login  text-center">
          <h1 className='pt-[50px] text-[40px] font-[700] text-[yellow]'><CakeIcon sx={{fontSize:40}}/>&nbsp;Log In&nbsp;<CakeIcon sx={{fontSize:40}}/></h1>
        <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        form = {form}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 400,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label = { <label style={{color:"Yellow"}}>Email</label>}
          name="email"
          className='pt-[50px]'
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label={ <label style={{color:"Yellow"}}>Password</label>}
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button className='bg-[yellow]' htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
        </div>
    </div>
  )
}

export default Login