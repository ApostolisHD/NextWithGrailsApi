import Head from 'next/head'
import {useState, useEffect} from 'react';
import Column from 'antd/lib/table/Column';
import 'antd/dist/antd.css';
import axios from 'axios';
import {useRouter} from 'next/router'
import {Divider, Layout, Menu, Table} from 'antd';
import {NotificationOutlined , UserOutlined, LaptopOutlined } from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;
const { SubMenu } = Menu;

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
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="Εργαζομενοι">
            <Menu.Item key="1">Δημιουργια</Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
        <Content style={{
          margin: '24px 16px 0'
        }}>
          <Divider>Εργαζομενοι</Divider>
          <div
            className="site-layout-background"
            style={{
            padding: 24,
            minHeight: 700
          }}>
            <Table dataSource={data.data} rowKey={record => record.employee_id}>
              <Column title="Τμημα" name="name" dataIndex="name"></Column>
              <Column title="Ονομα" name="first_name" dataIndex="first_name"></Column>
              <Column title="Επωνυμο" name="last_name" dataIndex="last_name"></Column>
              <Column title="ΑΦΜ" name="afm" dataIndex="afm"></Column>
              <Column
                title="Ημερομηνια Γεννησης"
                name="date_of_birth"
                dataIndex="date_of_birth"></Column>
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