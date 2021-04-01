import 'antd/dist/antd.css';
import axios from 'axios';
import {useRouter} from 'next/router';
import {Divider,Form,Input,Button,Row,Col,Space,notification,message} from 'antd';
import {BankOutlined} from '@ant-design/icons';
import LayoutCustom from '../../components/layout';

export async function getServerSideProps(ctx) {
  try {
    let data = await axios.get(`http://localhost:8080/department/${ctx.params.id}`, {headers:{cookie: ctx.req.headers.cookie}},{withCredentials: true});
    return {
      props: {
        data: data.data
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {
        data: null
      }
    }
  }
}


export default function employeeEdit(data) {
  const router = useRouter();
  async function onFinish(values) {
    const vertification = await axios.put(`http://localhost:8080/department/${data.data.department.department_id}`, {name: values.name}, {withCredentials: true});
    if (vertification.data.status == 200) {
      router.back();
    } else if (vertification.data.status == 400){
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
      description: 'Το όνομα του τμήματος που χρησιμοποιήσατε υπάρχει ήδη. Παρακαλώ εισάγετε νεο όνο' +
          'μα τμηματος',
      duration: 0,
      btn,
      key,
      onClose: close
    });
  };

  const key = 'updatable';
  const openMessage = () => {
    message.loading({content: 'Επεξεργασια...', key});
    setTimeout(() => {
      message.success({content: 'Ετοιμο!', key, duration: 10});
    }, 1000);
  };
  return (
    <LayoutCustom>
      <Divider>Επεξεργασια τμηματος</Divider>
      <div className="site-layout-background">
        <Row justify="center">
          <Col span={12} offset={6}>
            <Form
              layout="vertical"
              name="normal_login"
              className="login-form"
              initialValues={data.data.department}
              onFinish={onFinish}>
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