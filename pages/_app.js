import '../styles/globals.css';
import {ConfigProvider} from 'antd';
import 'moment/locale/el';
import locale from 'antd/lib/locale/el_GR';

function MyApp({Component, pageProps}) {
  return (
    <ConfigProvider locale={locale}>
    <Component {...pageProps}/>
  </ConfigProvider>
  );
}

export default MyApp
