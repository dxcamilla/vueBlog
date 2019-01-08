import http from '../http'
const rootPath = process.env.VUE_APP_serverURL;
// 发送验证码
const user_sendCode = (params) => {
  const url = rootPath + '/user/sendCode';
  return http.post(url, params)
}
// 注册第一步
const user_rgstFirstStep = (params) => {
  const url = rootPath + '/user/registerFirst';
  return http.post(url, params)
}
// 注册第二步
const user_setPwd = (params) => {
  const url = rootPath + '/user/registerNext';
  return http.post(url, params)
}
export {
  user_sendCode,
  user_rgstFirstStep,
  user_setPwd
}