import 'antd/dist/antd.css';
import axios from 'axios';
import {useRouter} from 'next/router'
import {
  Divider,
  Form,
  Input,
  Button,
  Row,
  Col,
  Space,
} from 'antd';
import {BankOutlined} from '@ant-design/icons';
import LayoutCustom from '../../components/layout'

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

  return (
    <LayoutCustom>
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
                <Space
                  size='large'
                  style={{
                  marginInlineStart: '20%'
                }}>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Αποθηκευση
                  </Button>
                  <Button
                    type="primary"
                    danger
                    className="login-form-button"
                    onClick={() => router.back()}>
                    Ακυρωση
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </LayoutCustom>
  )
}