import Head from 'next/head'
import {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import {useRouter} from 'next/router'
import {
  Layout,
  Menu,
  Breadcrumb,
  Divider,
  Row,
  Col,
  Table
} from 'antd';
import {Space, Card} from 'antd';
import Column from 'antd/lib/table/Column';
const {Header, Content, Footer} = Layout;

export async function getServerSideProps() {
  let data;
  data = await
  axios.get(`http://localhost:8080/employee`);
  return {
    props: {
      data: data.data
    }
  }
}

export default function employeeTable(data) {
  return (
    <Table dataSource={data.data} rowKey={record => record.employee_id}>
      <Column title="First Name" name="first_name" dataIndex="first_name"></Column>
    </Table>
  );
}