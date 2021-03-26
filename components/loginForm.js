import {useCookies} from 'react-cookie'
import axios from 'axios';
import {useRouter} from 'next/router'
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  notification
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';


export default function login() {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["user"])

  async function handleLogin (values) {
    const vertification = await axios.get(`http://localhost:8080/authentication`, {params:{user_name:values.user_name, user_password:values.user_password}}) 
    console.log(vertification.data.sessionVariable)
    setCookie("user",vertification.data.sessionVariable, {
      path: "/",
      maxAge: 3600, // Expires after 1hr
      sameSite: true,
    })
    if (vertification.data.status==200) {
      router.push('/employees/employeesTable')
    }else if(vertification.data.status==500) {
      openNotification()
    }  
  }

  const close = () => {};
  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={() => {notification.close(key);}}>
        Κατάλαβα
      </Button>
    );
    notification.open({
      message: 'Λάθος στοιχεία',
      description:
        'Εισάγατε λάθος στοιχεία, παρακαλώ δοκιμάστε ξανά',
      btn,
      key,
      onClose: close,
    });
    }  
  

  return (
    <Row justify="space-between">
    <Col span={24} offset={6}>
    <Form
      onFinish={handleLogin}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        name="user_name"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="user_password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
     <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
    </Col>
    </Row>
  );
      }

