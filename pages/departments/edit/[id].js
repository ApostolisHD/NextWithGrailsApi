import 'antd/dist/antd.css';
import axios from 'axios';
import DepartmentForm from '../../../components/departmentForm';

export async function getServerSideProps(ctx) {
  try {
    let data = await axios.get(`http://localhost:8080/department/${ctx.params.id}`, { headers: { cookie: ctx.req.headers.cookie } }, { withCredentials: true });
    return {
      props: {
        data: data.data
      }
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
      props: {
        data: null
      }
    };
  }
};
export default function departmentEdit(data) {
  return (
   <DepartmentForm data={data}/>
  )
}