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
  DatePicker,
  ConfigProvider,
  Col
} from 'antd';
import {UserOutlined, LaptopOutlined, LockOutlined} from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const {Option} = Select;

export async function getServerSideProps(context) {
  let data;
  data = await
  axios.get(`http://localhost:8080/employee/${context.params.id}`);
  console.log(data)
  return {
    props: {
      data: data.data
    }
  }
}

export default function employeeEdit(data) {
  const router = useRouter();
  const [dateofbirthReg,setdateofBirthReg] = useState();
  async function onFinish(values) {
    const vertification = await
    axios.put(`http://localhost:8080/employee/${data.data.employee_id}`, {
      first_name: values.first_name,
      last_name: values.last_name,
      afm: values.afm,
      date_of_birth: dateofbirthReg,
      id_dep:43
    })
    console.log(vertification)
    if (vertification.data.status == 201) {
      router.back()
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
          <Divider>Επεξεργασια Εργαζομενου</Divider>
          <div
            className="site-layout-background"
            style={{
            padding: 24,
            paddingBottom: 300,
            minHeight: '100%'
          }}>
            <Row justify="center">
              <Col span={12} offset={6}>
                <Form name="normal_login" className="login-form" initialValues={data.data} onFinish={onFinish}>
                  <Form.Item
                    name="first_name"
                    rules={[{
                      required: true,
                      message: 'Παρακαλω εισαγετε το ονομα του εργαζομενου!'
                    }
                  ]}>
                    <Input
                      prefix={< UserOutlined className = "site-form-item-icon" />}
                      placeholder="Ονομα εργαζομενου"/>
                  </Form.Item>
                  <Form.Item
                    name="last_name"
                    rules={[{
                      required: true,
                      message: 'Παρακαλω εισαγετε το επωνυμο του εργαζομενου!'
                    }
                  ]}>
                    <Input
                      prefix={< UserOutlined className = "site-form-item-icon" />}
                      placeholder="Επωνυμο εργαζομενου"/>
                  </Form.Item>
                  <Form.Item
                    name="afm"
                    rules={[{
                      required: true,
                      message: 'Παρακαλω εισαγετε το ΑΦΜ του εργαζομενου!'
                    }
                  ]}>
                    <Input
                      prefix={< UserOutlined className = "site-form-item-icon" />}
                      placeholder="ΑΦΜ"/>
                  </Form.Item>
                  <Row justify="center">
                    <Col>
                      <Form.Item
                        name="date_of_birth"
                        rules={[{
                          required: true,
                          message: 'Παρακαλω εισαγετε την ημερομηνια γεννησης του εργαζομενου!'
                        }
                      ]}>
                        {/* <input type="date"></input> */}
                        <ConfigProvider locale={locale}>
                          <DatePicker defaultValue={moment(data.data.date_of_birth,'DD/MM/YYYY')} format='DD/MM/YYYY' onChange={e => setdateofBirthReg(e.format('DD/MM/YYYY'))}/>
                        </ConfigProvider>
                      </Form.Item>
                    </Col>
                  </Row>
                  {/* <Row justify="center">
                    <Col>
                      <Form.Item
                        name="id_dep"
                        rules={[{
                          required: true,
                          message: 'Παρακαλω εισαγετε την ημερομηνια γεννησης του εργαζομενου!'
                        }
                      ]}>
                        <Select style={{ width: 400}}>
                        {data.data.map((item) => <Option key={item.department_id} value={item.department_id}>{item.name}</Option>)}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row> */}
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
      <Footer
        style={{
        textAlign: 'center',
        paddingTop: 0,
        marginTop: 0
      }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}