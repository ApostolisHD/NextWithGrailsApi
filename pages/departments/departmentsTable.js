import Link from 'next/link'
import {useState, useEffect} from 'react';
import Column from 'antd/lib/table/Column';
import 'antd/dist/antd.css';
import axios from 'axios';
import {useRouter} from 'next/router'
import DepartmentTable from '../departments/departmentsTable'
import {Divider, Layout, Menu, Table,Space,Button} from 'antd';
import {UserOutlined, LaptopOutlined} from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

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

export default function departmentTable(data) {

  const deleteDepartment = async(id) => {
    const res =await axios.delete(`http://localhost:8080/employee/${id}`);
    if(res.data.status == 201)
      router.replace("/employees/employeesTable")
    else
      console.log(res.data.status)
};
  const router = useRouter();
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
            <SubMenu key="sub2" icon={< LaptopOutlined />} title="Τμηματα">
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
          <Divider>Τμηματα</Divider>
          <div
            className="site-layout-background"
            style={{
            padding: 24,
            paddingBottom: 300,
            minHeight: '100%'
          }}>
            <Table dataSource={data.data} rowKey={record => record.department_id}>
              <Column title="Τμημα" name="name" dataIndex="name"></Column>
              <Column
                 title="Διαχειρηση"
                key="department_id"
                render={(record) => (
                <Space size="middle">
                  <Button type="primary" htmlType="submit" >Επεξεργασια</Button>
                  <Button type="primary" danger onClick onClick={() => deleteDepartment(record.employee_id)}>Διαγραφη</Button>
                </Space>
              )}/>
            </Table>
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
  );
}