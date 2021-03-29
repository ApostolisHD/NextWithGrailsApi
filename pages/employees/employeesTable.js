import Column from 'antd/lib/table/Column';
import 'antd/dist/antd.css';
import axios from 'axios';
import {useRouter} from 'next/router'
import {
  Divider,
  Table,
  Space,
  Button
} from 'antd';
import LayoutCustom from '../../components/layout'

export async function getServerSideProps() {
  let data;
  data = await
  axios.get(`http://localhost:8080/employee`);
  return {
    props: {
      data: data.data
    }
  }
}

export default function employeeTable(data) {
  console.log(data)
  const router = useRouter();
  const deleteEmployee = async(id) => {
    const res = await axios.delete(`http://localhost:8080/employee/${id}`);
    if (res.data.status == 200) 
      router.replace("/employees/employeesTable")
    else 
      console.log(res.data.status)
  };

  return (
    <LayoutCustom>
      <Divider>Εργαζομενοι</Divider>
      <div
        className="site-layout-background"
        style={{
        padding: 24,
        paddingBottom: 300,
        minHeight: 700
      }}>
        <Table dataSource={data.data} rowKey={record => record.employee_id}>
          <Column title="Τμημα" name="name" dataIndex="name"></Column>
          <Column title="Ονομα" name="first_name" dataIndex="first_name"></Column>
          <Column title="Επωνυμο" name="last_name" dataIndex="last_name"></Column>
          <Column title="ΑΦΜ" name="afm" dataIndex="afm"></Column>
          <Column
            title="Ημερομηνια Γεννησης"
            name="date_of_birth"
            dataIndex="date_of_birth"></Column>
          <Column
            title="Διαχειρηση"
            key="employee_id"
            render={(record) => (
            <Space size="middle">
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => router.push({
                pathname: `/employees/[id]`,
                query: {
                  id: record.employee_id
                }
              })}>Επεξεργασια</Button>
              <Button
                type="primary"
                danger
                onClick={() => deleteEmployee(record.employee_id)}>Διαγραφη</Button>
            </Space>
          )}/>
        </Table>
      </div>
    </LayoutCustom>
  );
}