import Head from 'next/head'
import {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { useRouter } from 'next/router'
import LoginForm from '../components/loginForm'
export async function getServerSideProps(){
  let data;
  data = await axios.get(`http://localhost:8080/employee`);
  return {props: {data: data.data}}
}


export default function login(data) {

  return (
    <LoginForm></LoginForm>
);
  }
