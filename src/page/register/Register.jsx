import { Button, Form, Input } from 'antd';
import './Register.css'
import React from 'react'
import CakeIcon from '@mui/icons-material/Cake';
import { axiosLogin, saveToken} from '../../utils/axiosRequest';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    console.log('Success:', values);
      try {
          const{data} = await axiosLogin.post("register",values)
          saveToken(data.accessToken)
          navigate("/")
          form.resetFields();
      } catch (error) {
        
      }

  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='Register'>
        <div className="register bg-[white] text-center">
          <h1 className='pt-[50px] text-[40px] text-[yellow] font-[700]'><CakeIcon sx={{fontSize:40}}/>&nbsp;Register&nbsp;<CakeIcon sx={{fontSize:40}}/></h1>
        <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        
        form={form}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 400,
        }}
        initialValues={{
          remember: true,
        }}
        // form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={ <label style={{color:"Yellow"}}>Name</label>}
          name="name"
          className='pt-[50px]'
          rules={[
            {
              required: true,
              message: 'Please input your Name!',
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label={ <label style={{color:"Yellow"}}>Email</label>}
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={ <label style={{color:"Yellow"}}>Phone</label>}
          name="phonenumber"
          rules={[
            {
              required: true,
              message: 'Please input your Phone!',
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
              message: 'Please input your Password!',
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
          <Button className='bg-[yellow]'  htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
        </div>
    </div>
  )
}

export default Register