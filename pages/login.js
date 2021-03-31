import 'antd/dist/antd.css';
import LoginForm from '../components/loginForm';
import {Layout,Divider,Row,Col} from 'antd';
import {Space, Card} from 'antd';
const {Header, Footer} = Layout;

export default function login() {
  return (
    <Layout className="layout">
    <Header></Header>
      <Divider>Σύνδεση</Divider>
      <div className="site-layout-background" style={{ padding: 24, height: 780 }}>
      <Row justify="center">
        <Col xl>
          <Space direction="vertical" style={{
            width: 600
          }}>
            <Card title="Φόρμα Σύνδεσης" style={{textAlign:'center'}}>
              <LoginForm/>
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
