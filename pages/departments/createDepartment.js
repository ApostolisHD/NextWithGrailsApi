import Link from 'next/link'
import {useState, useEffect} from 'react';
import Column from 'antd/lib/table/Column';
import 'antd/dist/antd.css';
import axios from 'axios';
import {useRouter} from 'next/router'
import {
  Divider,
  Layout,
  Menu,
  Form,
  Input,
  Button,
  Row,
  Col
} from 'antd';
import FormItem from 'antd/lib/form/FormItem'
import {UserOutlined, BankOutlined, LockOutlined} from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

export default function createDepartment(data) {
  console.log(data.data)
  const router = useRouter();

  async function onFinish(values) {
    const vertification = await axios.post(`http://localhost:8080/department`, {name: values.name})
    if (vertification.data.status == 201) {
      router.replace("/departments/departmentsTable")
    } else if (vertification.data.status == 500) {
      console.log("oxi")
    }
  }
  return (
    <Layout>
      <Layout>
        <Header>
          <div className="logo"/>
          <h1 style={{
            color: "white"
          }}>Εργαζομενοι-Τμηματα</h1>
        </Header>
      </Layout>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
          console.log(broken);
        }}
          onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
          style={{
          minHeight: '100'
        }}>
          <div className="logo"/>
          <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={['sub2']}
            style={{
            height: '100%',
            borderRight: 0
          }}>
            <SubMenu key="sub1" icon={< UserOutlined />} title="Εργαζομενοι">
              <Menu.Item key="1" onClick={() => router.replace("/employees/employeesTable")}>Προβολη</Menu.Item>
              <Menu.Item key="2" onClick={() => router.replace("/employees/createEmployee")}>Δημιουργια</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={< BankOutlined />} title="Τμηματα">
              <Menu.Item
                key="5"
                onClick={() => router.replace("/departments/departmentsTable")}>Προβολη</Menu.Item>
              <Menu.Item
                key="6"
                onClick={() => router.replace("/departments/createDepartment")}>Δημιουργια</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{
          margin: '24px 16px 0'
        }}>
          <Divider>Δημιουργια Τμηματος</Divider>
          <div
            className="site-layout-background"
            style={{
            padding: 24,
            paddingBottom: 300,
            minHeight: '100%'
          }}>
            <Row justify="center">
              <Col span={12} offset={6}>
                <Form
                  onFinish={onFinish}
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                  remember: true
                }}>
                  <Form.Item
                    name="name"
                    rules={[{
                      required: true,
                      message: 'Παρακαλω εισαγετε το ονομα του τμηματος!'
                    }
                  ]}>
                    <Input
                      prefix={< UserOutlined className = "site-form-item-icon" />}
                      placeholder="Ονομα τμηματος"/>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Δημιουργια
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
      <Footer style={{
        textAlign: 'center',
        paddingTop:0,
        marginTop: 0
      }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}