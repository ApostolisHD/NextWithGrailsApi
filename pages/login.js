import Head from 'next/head'
import {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import {useRouter} from 'next/router'
import LoginForm from '../components/loginForm'
import {
  Layout,
  Menu,
  Breadcrumb,
  Divider,
  Row,
  Col
} from 'antd';
import {Space, Card} from 'antd';
const {Header, Content, Footer} = Layout;

// export async function getServerSideProps() {
//   let data;
//   data = await
//   axios.get(`http://localhost:8080/authentication`);
//   return {
//     props: {
//       data: data.data
//     }
//   }
// }
export default function login() {
  return (
    <Layout className="layout">
    <Header></Header>
      <Divider>Login</Divider>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 700 }}>
      <Row justify="center">
        <Col xl>
          <Space direction="vertical" style={{
            width: 600
          }}>
            <Card title="Login Form" style={{textAlign:'center'}}>
              <LoginForm/>
            </Card>
          </Space>
        </Col>
      </Row>
      </div>
      <Footer style={{
        textAlign: 'center'
      }}>Copyright &copy; Employee - Department Management 2021</Footer>
    </Layout>
  );
}
