import Link from 'next/link'
import {useState, useEffect} from 'react';
import Column from 'antd/lib/table/Column';
import 'antd/dist/antd.css';
import moment from 'moment';
import 'moment/locale/el'
import locale from 'antd/lib/locale/el_GR';
import axios from 'axios';
import {useRouter} from 'next/router'
import {
  Divider,
  Layout,
  Menu,
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Space,
  Dropdown
} from 'antd';
import {UserOutlined,BankOutlined} from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const {Option} = Select;

export async function getServerSideProps(context) {
  let data;
  data = await
  axios.get(`http://localhost:8080/department/${context.params.id}`);
  console.log(data)
  return {
    props: {
      data: data.data
    }
  }
}

export default function employeeEdit(data) {
  const router = useRouter();
  async function onFinish(values) {
    const vertification = await
    axios.put(`http://localhost:8080/department/${data.data.department_id}`, {name: values.name})
    console.log(vertification)
    if (vertification.data.status == 200) {
      router.back()
    } else if (vertification.data.status == 500) {
      console.log("oxi")
    }
  }

  const menu = (
    <Menu>
      <Menu.Item>
        logout
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout>
      <Layout>
        <Header>
        <div className="logo"/>
          <Row justify='space-between'>
            <Col span={6}>
              <h1 style={{
                color: "white"
              }}>Εργαζομενοι-Τμηματα</h1>
            </Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>col-4</Col>
            <Col span={4}>
              <Dropdown.Button
                overlay={menu}
                placement="bottomCenter"
                icon={< UserOutlined />}>
                Logout
              </Dropdown.Button>
            </Col>
          </Row>
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
          <Divider>Επεξεργασια τμηματος</Divider>
          <div
            className="site-layout-background"
            style={{
            padding: 24,
            paddingBottom: 300,
            minHeight: 800
          }}>
            <Row justify="center">
              <Col span={12} offset={6}>
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={data.data}
                  onFinish={onFinish}>
                  <Form.Item
                    name="name"
                    rules={[{
                      required: true,
                      message: 'Παρακαλω εισαγετε το ονομα του τμηματος!'
                    }
                  ]}>
                    <Input
                      prefix={< BankOutlined className = "site-form-item-icon" />}
                      placeholder="Ονομα Τμηματος"/>
                  </Form.Item>
                  <Form.Item>
                        <Space size='large' style={{marginInlineStart:'20%'}}>
                          <Button type="primary" htmlType="submit" className="login-form-button">
                            Αποθηκευση
                          </Button>
                          <Button type="primary" danger className="login-form-button"  onClick={() => router.back()}>
                            Ακυρωση
                          </Button>
                        </Space>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
      <Footer
        style={{
        textAlign: 'center',
        paddingTop: 0,
        marginTop: 0
      }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
    }