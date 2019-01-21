import http from './http'
const rootPath = process.env.VUE_APP_serverURL;
const api_home = () => {
  const url = rootPath + "/api";
  return http.get(url)
}
const api_detail = cateIds => {
  const url = rootPath + '/api/detail'
  return http.get(url, cateIds)
}

export {
  api_home,
  api_detail
}