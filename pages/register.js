import Head from 'next/head'
import {useState, useEffect, useDebugValue} from 'react';
import styles from '../styles/Home.module.css'
import 'antd/dist/antd.css';
import {Table, Space,Form,Input,InputNumber,Typography,Popconfirm, Button, Badge} from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router'
import FormItem from 'antd/lib/form/FormItem';

export default function login() {

 async function onFinish(values){
   console.log(values)
   await axios.post(`http://localhost:8080/department`,{
     name:values.name
   })
 }

  return (
    <Form onFinish={onFinish}>
        <FormItem name="name">
          <Input></Input>
        </FormItem>
        <Button htmlType="submit">click</Button>
    </Form>
);
  }
