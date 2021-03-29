import 'antd/dist/antd.css';
import axios from 'axios';
import {useRouter} from 'next/router'
import {
  Divider,
  Menu,
  Form,
  Input,
  Button,
  Row,
  Col,
} from 'antd';
import {BankOutlined} from '@ant-design/icons';
import LayoutCustom from '../../components/layout'


export default function createDepartment(data) {
  console.log(data.data)
  const router = useRouter();

  async function onFinish(values) {
    const vertification = await axios.post(`http://localhost:8080/department`, {name: values.name})
    if (vertification.data.status == 200) {
      router.replace("/departments/departmentsTable")
    } else if (vertification.data.status == 500) {
      console.log("oxi")
    }
  }

  return (
    <LayoutCustom>
      <Divider>Δημιουργια Τμηματος</Divider>
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
                   prefix={< BankOutlined className = "site-form-item-icon" />}
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
    </LayoutCustom>
  );
}