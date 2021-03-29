import {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import moment from 'moment';
import 'moment/locale/el'
import locale from 'antd/lib/locale/el_GR';
import axios from 'axios';
import {useRouter} from 'next/router'
import LayoutCustom from '../../components/layout'
import {
  Divider,
  notification,
  Form,
  Input,
  Button,
  Select,
  Row,
  DatePicker,
  ConfigProvider,
  Space,
  Col,
  message
} from 'antd';
import {UserOutlined} from '@ant-design/icons';

const {Option} = Select;

export async function getServerSideProps(context) {
  let data;
  data = await axios.get(`http://localhost:8080/employee/${context.params.id}`);
  let depData = await axios.get(`http://localhost:8080/department`);
  return {
    props: {
      data: data.data,
      depData: depData.data
    }
  }
}

export default function employeeEdit(data) {
  const router = useRouter();
  const [dateofbirthReg,
    setdateofBirthReg] = useState();

  async function onFinish(values) {
    const vertification = await
    axios.put(`http://localhost:8080/employee/${data.data.employee_id}`, {
      first_name: values.first_name,
      last_name: values.last_name,
      afm: values.afm,
      date_of_birth: dateofbirthReg,
      id_dep: values.id_dep
    })
    if (vertification.data.status == 200) {
      openMessage();
      router.back();
    } else 
      openNotification();
    }
  ;

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
      <div
        className="site-layout-background"
        style={{
        padding: 24,
        paddingBottom: 300,
        minHeight: 700
      }}>
        <Row justify="center">
          <Col span={12} offset={6}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={data.data}
              onFinish={onFinish}>
              <Form.Item
                name="first_name"
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
                    name="date_of_birth"
                    rules={[{
                      required: true,
                      message: 'Παρακαλω εισαγετε την ημερομηνια γεννησης του εργαζομενου!'
                    }
                  ]}>
                    <ConfigProvider locale={locale}>
                      <DatePicker
                        defaultValue={moment(data.data.date_of_birth, 'DD/MM/YYYY')}
                        format='DD/MM/YYYY'
                        onChange={e => setdateofBirthReg(e.format('DD/MM/YYYY'))}/>
                    </ConfigProvider>
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="center">
                <Col>
                  <Form.Item
                    name="id_dep"
                    rules={[{
                      required: true,
                      message: 'Παρακαλω εισαγετε την ημερομηνια γεννησης του εργαζομενου!'
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