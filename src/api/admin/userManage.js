import http from '../http'
const admin_userManage = pageNum => {
  const url = process.env.VUE_APP_serverURL + '/admin/usersManage'
  return http.get(url, pageNum)
}
export { admin_userManage }