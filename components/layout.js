import 'antd/dist/antd.css';
import axios from 'axios';
import {useRouter} from 'next/router';
import { Layout, Menu,Row,Col,Breadcrumb,Dropdown} from 'antd';
import {UserOutlined, BankOutlined} from '@ant-design/icons';
import { useEffect, useState } from 'react';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
export default function allIndex({children}) {
    const router = useRouter();
    const [userName,setUserName]= useState('')

    async function handleLogout () {
      const vertification = await axios.get(`http://localhost:8080/authentication/logout`,{withCredentials: true});
      if (vertification.data.status==200) {
        router.push('/');
      }
  };
  
  async function showUserName () {
    const vertification = await axios.get(`http://localhost:8080/authentication/userName`,{withCredentials: true});
    console.log(vertification)
    if (vertification.data.status==200) {
      setUserName(vertification.data.userName);    
    }else if(vertification.data.status==401) {
      router.push('/');
    }
    };

  useEffect(()=>{
    showUserName()
  },[])
  
  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogout}>
        Αποσύνδεση
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
            <Col span={4}></Col>
            <Col span={4}></Col>
            <Col span={4}></Col>
            <Col span={4}>
              <Dropdown.Button
                overlay={menu}
                placement="bottomCenter"
                icon={< UserOutlined />}>
                {userName}
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
          minHeight: '100vh'
        }}>
          <div className="logo"/>
          <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={['sub1','sub2']}
            style={{
            height: '100vh',
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