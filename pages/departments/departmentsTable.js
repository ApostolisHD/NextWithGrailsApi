import Column from 'antd/lib/table/Column';
import 'antd/dist/antd.css';
import axios from 'axios';
import {useRouter} from 'next/router'
import {
  Divider,
  Layout,
  Menu,
  Table,
  Space,
  Button,
} from 'antd';
import LayoutCustom from '../../components/layout'

export async function getServerSideProps() {
  let data;
  data = await
  axios.get(`http://localhost:8080/department`);
  console.log(data)
  return {
    props: {
      data: data.data
    }
  }
}

export default function departmentTable(data) {
  const router = useRouter();
  const deleteDepartment = async(id) => {
    console.log(id)
    const res = await axios.delete(`http://localhost:8080/department/${id}`);
    if (res.data.status == 200) 
      router.replace("/departments/departmentsTable")
    else 
      console.log(res.data.status)
  };

  return (
    <LayoutCustom>
      <Divider>Τμηματα</Divider>
      <div
        className="site-layout-background"
        style={{
        padding: 24,
        paddingBottom: 300,
        minHeight: 700
      }}>
        <Table dataSource={data.data} rowKey={record => record.department_id}>
          <Column title="Τμημα" name="name" dataIndex="name"></Column>
          <Column
            title="Διαχειρηση"
            key="department_id"
            render={(record) => (
            <Space size="middle">
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => router.push({
                pathname: `/departments/[id]`,
                query: {
                  id: record.department_id
                }
              })}>Επεξεργασια</Button>
              <Button
                type="primary"
                danger
                onClick={() => deleteDepartment(record.department_id)}>Διαγραφη</Button>
            </Space>
          )}/>
        </Table>
      </div>
    </LayoutCustom>
  );
}