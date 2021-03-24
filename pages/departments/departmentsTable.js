import Link from 'next/link'
import {useState, useEffect} from 'react';
import Column from 'antd/lib/table/Column';
import 'antd/dist/antd.css';
import axios from 'axios';
import {useRouter} from 'next/router'
import DepartmentTable from '../departments/departmentsTable'
import {Divider, Layout, Menu, Table} from 'antd';
import {UserOutlined, LaptopOutlined } from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;
const { SubMenu } = Menu;

export async function getServerSideProps() {
  let data;
  data = await
  axios.get(`http://localhost:8080/department`);
  console.log(data)
  return {
    props: {
      data: data.data
    }
  }
}

export default function departmentTable(data){
    console.log(data.data)
        const router = useRouter();
      return (
        <Layout>
          <Layout>
            <Header>
              <div className="logo"/>
              <h1 style={{color:"white"}}>Εργαζομενοι-Τμηματα</h1>
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
          }}>
            <div className="logo"/>
            <Menu
              theme="dark"
              mode="inline"
              defaultOpenKeys={['sub2']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="Εργαζομενοι">
              <Menu.Item key="1" onClick={() => router.replace("/employees/employeesTable")}>Προβολη</Menu.Item>
                <Menu.Item key="2" onClick={() => router.replace("")}>Δημιουργια</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="Τμηματα">
              <Menu.Item key="5" onClick={() => router.replace("/departments/departmentsTable")}>Προβολη</Menu.Item>
                <Menu.Item key="6">Δημιουργια</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
            <Content style={{
              margin: '24px 16px 0'
            }}>
              <Divider>Τμηματα</Divider>
              <div
                className="site-layout-background"
                style={{
                padding: 24,
                minHeight: 700
              }}>
                <Table dataSource={data.data} rowKey={record => record.department_id}>
                  <Column title="Τμημα" name="name" dataIndex="name"></Column>
                </Table>
              </div>
            </Content>
          </Layout>
          <Footer style={{
              textAlign: 'center'
            }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      );
    }