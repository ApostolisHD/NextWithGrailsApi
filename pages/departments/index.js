import 'antd/dist/antd.css';
import axios from 'axios';
import DepartmentTable from '../../components/departmentTable'

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

  return (
      <DepartmentTable data={data}/>
  );
}