import axios from 'axios';
import {useRouter} from 'next/router';
import {Form,Input,Row,Col,Button,notification} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


export default function login() {
  const router = useRouter();

  async function handleRegister (values) {
    const vertification = await axios.post(`http://localhost:8080/user`,{user_name:values.user_name, user_password:values.user_password},{withCredentials: true}); 
    if (vertification.data.status==201) {
      router.push('/employees/employeesTable');
    }else if(vertification.data.status==400) {
      openNotification();
    }  
  };
  

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
    };
  

  return (
    <Row justify="space-between">
    <Col span={24} offset={6}>
    <Form
      layout="vertical"
      onFinish={handleRegister}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        name="user_name"
        label="Όνομα χρήστη"
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
        label="Κώδικος χρήστη"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password   
        prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"/>
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Επαλήθευση Κώδικου"
        dependencies={['user_password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('user_password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password  
        prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password" />
      </Form.Item>
     <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Εγγραφή
        </Button>
        ή <a href="/">Έχετε ήδη λογαριασμό?</a>
      </Form.Item>
    </Form>
    </Col>
    </Row>
  );
      }

