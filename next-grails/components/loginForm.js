import Head from 'next/head'
import {useState, useEffect} from 'react';
import {Layout, Menu} from 'antd';
import axios from 'axios';
import {useRouter} from 'next/router'
import Link from 'next/link'
import {SmileFilled} from '@ant-design/icons'
import {
  Form,
  Select,
  Input,
  Switch,
  Slider,
  Button,
  DatePicker
} from 'antd'

const content = {
  marginTop: '100px'
}
const FormItem = Form.Item

export default function login() {
  return (
    <div style={content}>
      <div className="text-center mb-5">
        <Link href="#">
          <a className="logo mr-0">
            <SmileFilled size={48} strokeWidth={1}/>
          </a>
        </Link>
        <p className="mb-0 mt-3 text-disabled">Login!</p>
      </div>
      <div>
        <div className="text-center">
          <Form layout="horizontal">
            <FormItem
              label="Username"
              name="username"
              rules={[{
                required: true,
                message: 'Please input your username!'
              }
            ]}
              labelCol={{
              span: 8
            }}
              wrapperCol={{
              span: 8
            }}>
              <Input/>
            </FormItem>

            <FormItem
              label="Switch"
              labelCol={{
              span: 8
            }}
              wrapperCol={{
              span: 8
            }}>
              <Switch defaultChecked name="switch"/>
            </FormItem>
            <FormItem
              label="DatePicker"
              labelCol={{
              span: 8
            }}
              wrapperCol={{
              span: 8
            }}>
              <DatePicker name="startDate"/>
            </FormItem>
            <FormItem
              style={{
              marginTop: 48
            }}
              wrapperCol={{
              span: 8,
              offset: 8
            }}>
              <Button size="large" type="primary" htmlType="submit">
                OK
              </Button>
              <Button size="large" style={{
                marginLeft: 8
              }}>
                Cancel
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  )
}