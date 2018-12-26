import axios from 'axios'
import cookie from '@/assets/js/cookie.js'
const getToken = () => {
  return cookie.getCookie('loginToken') || '';
}
const http = axios.create({
  timeout: 15000,
});
console.log(getToken());
http.interceptors.request.use(config => {
  config.headers['access-token'] = getToken()
  // if (config.method === 'post') {
  //   //将axios默认接受的json数据格式转化成后台处理的from表单格式
  //   config.data = qs.stringify(config.data, { arrayFormat: 'brackets' });
  // }
  return config;
});
http.interceptors.response.use(res => {
  return res;
}, error => {
  console.log(error);
  return Promise.reject(error);
});
export default http;