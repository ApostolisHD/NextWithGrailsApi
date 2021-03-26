import 'antd/dist/antd.css';
import axios from 'axios';
import 'moment/locale/el'
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
  Col
} from 'antd';
import {UserOutlined, LaptopOutlined, BankOutlined} from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const {Option} = Select;

export async function getServerSideProps() {
  let data;
  data = await
  axios.get(`http://localhost:8080/department`);
  return {
    props: {
      data: data.data
    }
  }
}

export default function createEmployee(data) {
  const router = useRouter();
  async function onFinish(values) {
      console.log(values)
    const vertification = await axios.post(`http://localhost:8080/employee`, {
      first_name: values.first_name,
      last_name: values.last_name,
      afm: values.afm,
      date_of_birth:values.date_of_birth,
      id_dep:values.id_dep
    })
    if (vertification.data.status == 200) {
      router.replace("/employees/employeesTable")
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
        style={{minHeight: '100'}}>
          <div className="logo"/>
          <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={['sub1']}
            style={{
            height: '100%',
            borderRight: 0,
          
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
          <Divider>Δημιουργια Εργαζομενου</Divider>
          <div
            className="site-layout-background"
            style={{
            padding: 24,
            paddingBottom:300,
            minHeight: 800
          }}>
            <Row justify="center">
              <Col span={12} offset={6}>
                <Form onFinish={onFinish} name="normal_login" className="login-form">
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
                          <DatePicker format='DD/MM/YYYY'/>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row justify="center">
                    <Col>
                      <Form.Item
                        name="id_dep"
                        rules={[{
                          required: true,
                          message: 'Παρακαλω εισαγετε το τμημα του εργαζομενου!'
                        }
                      ]}>
                        <Select style={{ width: 400}} placeholder="Επιλεξτε το τμημα του εργαζομενου">
                        {data.data.map((item) => <Option key={item.department_id} value={item.department_id}>{item.name}</Option>)}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
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