import Column from 'antd/lib/table/Column';
import 'antd/dist/antd.css';
import axios from 'axios';
import {useRouter} from 'next/router';
import {Divider,Table,Space,Button,notification,Popconfirm} from 'antd';
import LayoutCustom from '../../components/layout';

export async function getServerSideProps(ctx) {
  try {
    let data = await axios.get(`http://localhost:8080/department`, {headers:{cookie: ctx.req.headers.cookie}},{withCredentials: true});
    return {
      props: {
        data: data.data,
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

export default function departmentTable(data) {
  const router = useRouter();
  const deleteDepartment = async(id) => {
    const vertification = await axios.delete(`http://localhost:8080/department/${id}`,{withCredentials: true});
    if (vertification.data.status == 200) 
      router.replace("/departments/departmentsTable");
    else if (vertification.data.status == 500) {
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
      description: 'Δεν μπορεις να διαγραψεις αυτο το τμημα. Γιατι εχει εργαζομενους!',
      duration: 0,
      btn,
      key,
      onClose: close
    });
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
              <Popconfirm
                title="Ειστε σίγουρος οτι θέλετε να διαγράψετε το τμήμα?"
                onConfirm={() => deleteDepartment(record.department_id)}
                onCancel={() => router.replace("/departments/departmentsTable")}
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