import 'antd/dist/antd.css';
import 'moment/locale/el';
import axios from 'axios';
import EmployeeForm from '../../../components/employeeForm'

export async function getServerSideProps(ctx) {
  try {
    let data = await axios.get(`http://localhost:8080/employee/${ctx.params.id}`, { headers: { cookie: ctx.req.headers.cookie } }, { withCredentials: true });
    let depData = await axios.get(`http://localhost:8080/department`, { headers: { cookie: ctx.req.headers.cookie } }, { withCredentials: true });
    if (data.data.status === 200) {
      return {
        props: {
          data: data.data,
          depData: depData.data
        }
      }
    } else {
      return {
        redirect: {
          destination: '/employees/new',
          permanent: false,
        }
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
};

export default function employeeEdit(data) {

  return (
    <EmployeeForm data= {data}/>
  );
}