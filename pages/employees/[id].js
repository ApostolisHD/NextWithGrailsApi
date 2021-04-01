import 'antd/dist/antd.css';
import moment from 'moment';
import 'moment/locale/el';
import axios from 'axios';
import {useRouter} from 'next/router';
import LayoutCustom from '../../components/layout';
import {Divider,notification,Form,Input,Button,Select,Row,DatePicker,Space,Col,message} from 'antd';
import {UserOutlined} from '@ant-design/icons';

const {Option} = Select;

export async function getServerSideProps(ctx) {
  try {
    let data = await axios.get(`http://localhost:8080/employee/${ctx.params.id}`, {headers:{cookie: ctx.req.headers.cookie}},{withCredentials: true});
    let depData = await axios.get(`http://localhost:8080/department`, {headers:{cookie: ctx.req.headers.cookie}},{withCredentials: true});
    return {
      props: {
        data: data.data,
        depData: depData.data
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
};

export default function employeeEdit(data) {
  const router = useRouter();

  async function onFinish(values) {
    const vertification = await axios.put(`http://localhost:8080/employee/${data.data.employee.employee_id}`, {
      first_name: values.firstName,
      last_name: values.lastName,
      afm: values.afm,
      date_of_birth: values.dateOfBirth,
      id_dep: values.departmentId
    }, {withCredentials: true});
    if (vertification.data.status == 200) {
      router.back();
    } else if (vertification.data.status == 400) {
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
    message.loading({content: 'Επεξεργασια...', key});
    setTimeout(() => {
      message.success({content: 'Ετοιμο!', key, duration: 10});
    }, 1000);
  };

  return (
    <LayoutCustom>
      <Divider>Επεξεργασια Εργαζομενου</Divider>
      <div className="site-layout-background">
        <Row justify="center">
          <Col span={12} offset={6}>
            <Form
              layout="vertical"
              name="normal_login"
              className="login-form"
              initialValues={{
                    firstName: data.data.employee.first_name,
                    lastName: data.data.employee.last_name,
                    afm: data.data.employee.afm,
                    dateOfBirth : moment.utc(data.data.employee.date_of_birth, 'DD/MM/YYYY'),
                    departmentId: data.data.employee.id_dep
                    }}
              onFinish={onFinish}>
              <Form.Item
                name="firstName"
                label="Όνομα εργαζομένου"
                hasFeedback
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
                name="lastName"
                label="Επώνυμο εργαζομένου"
                hasFeedback
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
                name="afm"
                label="ΑΦΜ εργαζομένου"
                hasFeedback
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
                    name="dateOfBirth"
                    label="Ημερομηνία γέννησης"
                    hasFeedback
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
                    name="departmentId"
                    label="Τμημα εργαζομένου"
                    hasFeedback
                    rules={[{
                      required: true,
                      message: 'Παρακαλω εισαγετε το τμήμα του εργαζομενου!'
                    }
                  ]}>
                    <Select style={{
                      width: 400
                    }}>
                      {data
                        .depData
                        .map((item) => <Option key={item.department_id} value={item.department_id}>{item.name}</Option>)}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
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
  );
}