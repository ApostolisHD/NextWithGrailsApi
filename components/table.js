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
        openNotificationEmployee();
    }
    };

  const openNotificationEmployee = () => {
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
  const deleteDepartment = async(id) => {
    const vertification = await axios.delete(`http://localhost:8080/department/${id}`,{withCredentials: true});
    if (vertification.data.status == 202) 
      router.replace("/departments");
    else if (vertification.data.status == 400) {
        openNotificationDepartment();
    }
    };

  const openNotificationDepartment = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={() => notification.close(key)}>
        Κατάλαβα!
      </Button>
    );
    notification.open({
      message: 'Προσοχή!',
      description: 'Δεν μπορεις να διαγραψεις αυτο το τμημα. Γιατι εχει εργαζομενους!',
      duration: 0,
      btn,
      key,
      onClose: close
    });
  };

  return (
    <LayoutCustom>
      {data.data.employee ? <Divider>Εργαζομενοι</Divider> : <Divider>Τμηματα</Divider>}
      <div className="site-layout-background">
        <Table dataSource={ data.data.employee ? data.data.employee : data.data.department} rowKey={record => record.employee_id ? record.employee_id:record.department_id}>
          <Column title="Τμημα" name="name" dataIndex="name"></Column>
          <Column title={data.data.employee?"Όνομα":null} name="first_name" dataIndex="first_name"></Column>
          <Column title={data.data.employee?"Επωνυμο":null} name="last_name" dataIndex="last_name"></Column>
          <Column title={data.data.employee?"ΑΦΜ":null} name="afm" dataIndex="afm"></Column>
          <Column title={data.data.employee?"Ημερομηνια Γεννησης":null} name="date_of_birth" dataIndex="date_of_birth"></Column>
          {data.data.employee?
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
          )}/>:
          <Column
            title="Διαχειρηση"
            key="department_id"
            render={(record) => (
            <Space size="middle">
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => router.push({
                pathname: `/departments/edit/[id]`,
                query: {
                  id: record.department_id
                }
              })}>Επεξεργασια</Button>
              <Popconfirm
                title="Ειστε σίγουρος οτι θέλετε να διαγράψετε το τμήμα?"
                onConfirm={() => deleteDepartment(record.department_id)}
                onCancel={() => router.replace("/departments")}
                okText="Ναι"
                cancelText="Οχι">
                <Button type="primary" danger>Διαγραφη</Button>
              </Popconfirm>
            </Space>
          )}/>
          }
        </Table>
      </div>
    </LayoutCustom>
  );
}