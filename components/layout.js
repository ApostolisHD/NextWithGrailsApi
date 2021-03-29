import Link from 'next/link'
import {useState, useEffect, Children} from 'react';
import Column from 'antd/lib/table/Column';
import 'antd/dist/antd.css';
import axios from 'axios';
import {useRouter} from 'next/router'
import {
  Divider,
  Layout,
  Menu,
  Table,
  Space,
  Button,
  Row,
  Col,
  Breadcrumb,
  Dropdown
} from 'antd';
import {UserOutlined, BankOutlined} from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

export default function employeeTable({children}) {
    const router = useRouter();
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
            defaultOpenKeys={['sub1','sub2']}
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
         <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          {children}
        </Breadcrumb.Item> 
      </Breadcrumb>
        </Content>
      </Layout>
      <Footer
        style={{
        textAlign: 'center',
        paddingTop: 0,
        marginTop: 0
      }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}