import 'antd/dist/antd.css';
import axios from 'axios';
import {useRouter} from 'next/router';
import {Divider,Form,Input,Button,Select,Row,DatePicker,Col,notification,message} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import LayoutCustom from '../../components/layout';

const {Option} = Select;

export async function getServerSideProps(ctx) {
  try {
    let data = await axios.get(`http://localhost:8080/department`,{headers:{cookie: ctx.req.headers.cookie}},{withCredentials:true});
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
};

export default function createEmployee(data) {
  const router = useRouter();
  async function onFinish(values) {
    const vertification = await axios.post(`http://localhost:8080/employee`, {
      first_name: values.first_name,
      last_name: values.last_name,
      afm: values.afm,
      date_of_birth: values.date_of_birth,
      id_dep: values.id_dep
    },{withCredentials:true});
    if (vertification.data.status == 201) {
        openMessage();
        router.replace("/employees");
    } else if(vertification.data.status == 400){
      openNotification();
    }
    };
  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={() => notification.close(key)}>
        Confirm
      </Button>
    );
    notification.open({
      message: 'Προσοχή!',
      description: 'Το ΑΦΜ που χρησιμοποιήσατε υπάρχει ήδη. Παρακαλώ γράψτε το δικό σας ΑΦΜ!',
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
      <Divider>Δημιουργια Εργαζομενου</Divider>
      <div className="site-layout-background">
        <Row justify="center">
          <Col span={12} offset={6}>
            <Form
              layout="vertical"
              name="normal_login"
              className="login-form"
              initialValues={data.data}
              onFinish={onFinish}>
              <Form.Item
                name="first_name"
                hasFeedback
                label="Όνομα εργαζομένου"
                rules={[
                {
                  min: 3,
                  max: 50,
                  required: true,
                  message: 'Παρακαλω εισαγετε το ονομα του εργαζομενου!'
                }, {
                  pattern: "^[α-ωΑ-Ωa-zA-Z]+$",
                  message: "Παρακαλώ εισάγεται μόνο γράμματα"
                }
              ]}>
                <Input
                  prefix={< UserOutlined className = "site-form-item-icon" />}
                  placeholder="Ονομα εργαζομενου"/>
              </Form.Item>
              <Form.Item
                name="last_name"
                hasFeedback
                label="Επώνυμο εργαζομένου"
                rules={[
                {
                  min: 3,
                  max: 50,
                  required: true,
                  message: 'Παρακαλω εισαγετε το επωνυμο του εργαζομενου!'
                }, {
                  pattern: "^[α-ωΑ-Ωa-zA-Z]+$",
                  message: "Παρακαλώ εισάγεται μόνο γράμματα"
                }
              ]}>
                <Input
                  prefix={< UserOutlined className = "site-form-item-icon" />}
                  placeholder="Επωνυμο εργαζομενου"/>
              </Form.Item>
              <Form.Item
                hasFeedback
                name="afm"
                label="ΑΦΜ εργαζομένου"
                rules={[
                {
                  required: true,
                  message: 'Παρακαλω εισαγετε το ΑΦΜ του εργαζομενου!'
                }, {
                  min: 9,
                  max: 9,
                  message: 'Το ΑΦΜ πρέπει να έχει 9 ψηφία'
                }, {
                  pattern: "^[0-9]*$",
                  message: "Παρακαλώ εισάγεται μόνο αριθμούς"
                }
              ]}>
                <Input
                  prefix={< UserOutlined className = "site-form-item-icon" />}
                  placeholder="ΑΦΜ"/>
              </Form.Item>
              <Row justify="center">
                <Col>
                  <Form.Item
                    hasFeedback
                    name="date_of_birth"
                    label="Ημερομηνία γέννησης"
                    rules={[{
                      required: true,
                      message: 'Παρακαλω εισαγετε την ημερομηνια γεννησης του εργαζομενου!'
                    }
                  ]}>
                      <DatePicker format="DD/MM/YYYY"/>
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="center">
                <Col>
                  <Form.Item
                    name="id_dep"
                    hasFeedback
                    label="Τμημα εργαζομένου"
                    rules={[{
                      required: true,
                      message: 'Παρακαλω εισαγετε την ημερομηνια γεννησης του εργαζομενου!'
                    }
                  ]}>
                    <Select 
                    placeholder="Τμήμα Εργαζομένου"
                    style={{
                      width: 400
                    }}>
                      {data
                        .data
                        .map((item) => <Option key={item.department_id} value={item.department_id}>{item.name}</Option>)}
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
    </LayoutCustom>
  );
}