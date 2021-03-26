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
  Table,
  Space,
  Button,
  Row,
  Col,
  Dropdown
} from 'antd';
import {UserOutlined, BankOutlined} from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

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
  console.log(data)
  const router = useRouter();
  const [isModalVisible,
    setIsModalVisible] = useState(false);

  const deleteEmployee = async(id) => {
    const res = await axios.delete(`http://localhost:8080/employee/${id}`);
    if (res.data.status == 200) 
      router.replace("/employees/employeesTable")
    else 
      console.log(res.data.status)
  };

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
            defaultOpenKeys={['sub1']}
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
          <Divider>Εργαζομενοι</Divider>
          <div
            className="site-layout-background"
            style={{
            padding: 24,
            paddingBottom: 300,
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
              <Column
                title="Διαχειρηση"
                key="employee_id"
                render={(record) => (
                <Space size="middle">
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => router.push({
                    pathname: `/employees/[id]`,
                    query: {
                      id: record.employee_id
                    }
                  })}>Επεξεργασια</Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => deleteEmployee(record.employee_id)}>Διαγραφη</Button>
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