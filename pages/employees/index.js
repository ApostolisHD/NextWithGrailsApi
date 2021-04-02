import 'antd/dist/antd.css';
import axios from 'axios';
import EmployeeTable from '../../components/employeeTable'

export async function getServerSideProps(ctx) {
  try {
    let data = await axios.get(`http://localhost:8080/employee`,{headers:{cookie: ctx.req.headers.cookie}},{withCredentials:true});
    return {
      props: {
        data: data.data
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

export default function employeeTable(data) {

  return (
    <EmployeeTable data={data}/>
  )
}