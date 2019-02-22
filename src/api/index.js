import http from './http'
const rootPath = process.env.VUE_APP_serverURL;
const api_home = () => {
  const url = rootPath + "/api";
  return http.get(url)
}
const api_detail = params => {
  const url = rootPath + '/api/detail'
  return http.get(url, params)
}
const api_category = params => {
  const url = rootPath + '/api/category'
  return http.get(url, params)
}
export {
  api_home,
  api_detail,
  api_category
}