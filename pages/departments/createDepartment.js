import 'antd/dist/antd.css';
import axios from 'axios';
import {useRouter} from 'next/router'
import {Divider,notification,Form,Input,Button,Row,Col,message} from 'antd';
import {BankOutlined} from '@ant-design/icons';
import LayoutCustom from '../../components/layout';

export default function createDepartment(data) {
  console.log(data.data)
  const router = useRouter();

  async function onFinish(values) {
    const vertification = await axios.post(`http://localhost:8080/department`, {name: values.name},{withCredentials: true});
    if (vertification.data.status == 200) {
      openMessage();
      router.replace("/departments/departmentsTable");
    } else if (vertification.data.status == 500){
      openNotification();
    }
    };

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={() => notification.close(key)}>
        Κατάλαβα!
      </Button>
    );
    notification.open({
      message: 'Προσοχη!',
      description: 'Το όνομα του τμήματος που χρησιμοποιήσατε υπάρχει ήδη. Παρακαλώ εισάγετε νεο όνομα τμηματος',
      duration: 0,
      btn,
      key,
      onClose: close
    });
  };
  const key = 'updatable';
  const openMessage = () => {
    message.loading({content: 'Δημιουργια...', key});
    setTimeout(() => {
      message.success({content: 'Καταχωρηθηκε!', key, duration: 10});
    }, 1000);
  };

  return (
    <LayoutCustom>
      <Divider>Δημιουργια Τμηματος</Divider>
      <div className="site-layout-background">
        <Row justify="center">
          <Col span={12} offset={6}>
            <Form
              layout="vertical"
              onFinish={onFinish}
              name="normal_login"
              className="login-form"
              initialValues={{
              remember: true
            }}>
              <Form.Item
                name="name"
                label="Όνομα τμήματος"
                hasFeedback
                rules={[
                {
                  required: true,
                  message: 'Παρακαλω εισαγετε το ονομα του τμηματος!'
                }, {
                  max: 9,
                  message: 'Το τμήμα πρέπει να έχει 9 ψηφία'
                }, {
                  pattern: "^[α-ωΑ-Ωa-zA-Z]+$",
                  message: "Παρακαλώ εισάγεται μόνο γράμματα"
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