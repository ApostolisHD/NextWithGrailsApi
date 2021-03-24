import Head from 'next/head'
import {useState} from 'react';
import {Layout, Menu} from 'antd';
import axios from 'axios';
import {useRouter} from 'next/router'
import Link from 'next/link'
import {SmileFilled} from '@ant-design/icons'
import {
  Form,
  Input,
  Row,
  Col,
  Button,
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';


export default function login() {
  const router = useRouter();

  async function handleLogin () {
    const vertification = await axios.get(`http://localhost:8080/authentication`) 
    console.log(vertification)
    if (vertification.status==200) {
      router.push('/employees/employeesTable')
    }else if(vertification.status==500) {
      //message user not found
    }  
  }

  return (
    <Row justify="space-between">
    <Col span={24} offset={6}>
    <Form
      onFinish={handleLogin}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        name="user_name"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="user_password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
     <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
    </Col>
    </Row>
  );
      }

