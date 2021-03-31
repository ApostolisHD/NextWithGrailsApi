import 'antd/dist/antd.css';
import RegisterForm from '../components/registerForm';
import {Layout,Divider,Row,Col} from 'antd';
import {Space, Card} from 'antd';
const {Header, Footer} = Layout;

export default function register() {
  return (
    <Layout className="layout">
    <Header></Header>
      <Divider>Εγγραφή</Divider>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 780 }}>
      <Row justify="center">
        <Col xl>
          <Space direction="vertical" style={{
            width: 600
          }}>
            <Card title="Φόρμα Εγγραφής" style={{textAlign:'center'}}>
             <RegisterForm/>
            </Card>
          </Space>
        </Col>
      </Row>
      </div>
      <Footer style={{
        textAlign: 'center'
      }}>Copyright &copy; Employee - Department Management 2021</Footer>
    </Layout>
  );
}
