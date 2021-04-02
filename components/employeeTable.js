import Column from 'antd/lib/table/Column';
import 'antd/dist/antd.css';
import axios from 'axios';
import {useRouter} from 'next/router';
import {Divider,Table,Space,Button,notification,Popconfirm} from 'antd';
import LayoutCustom from '../components/layout';

export default function employeeTable({data}) {
  const router = useRouter();

  const deleteEmployee = async(id) => {
    const res = await axios.delete(`http://localhost:8080/employee/${id}`,{withCredentials:true});
    if (res.data.status == 202) {
      router.replace("/employees");
    } else if(res.data.status == 400){
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
      description: 'Κατι πηγε στραβα δοκιμαστε ξανα!',
      duration: 0,
      btn,
      key,
      onClose: close
    });
  };

  return (
    <LayoutCustom>
      <Divider>Εργαζομενοι</Divider>
      <div className="site-layout-background">
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
                pathname: `/employees/edit/[id]`,
                query: {
                  id: record.employee_id
                }
              })}>Επεξεργασια</Button>
              <Popconfirm
                title="Ειστε σίγουρος οτι θέλετε να διαγράψετε τον εργαζομενο?"
                onConfirm={() => deleteEmployee(record.employee_id)}
                onCancel={() => router.replace("/employees")}
                okText="Ναι"
                cancelText="Οχι">
                <Button type="primary" danger>Διαγραφη</Button>
              </Popconfirm>
            </Space>
          )}/>
        </Table>
      </div>
    </LayoutCustom>
  );
}