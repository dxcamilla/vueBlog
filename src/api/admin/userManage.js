import http from '../http'
const rootPath = process.env.VUE_APP_serverURL;
// 请求用户列表
const admin_userManage = pageNum => {
  const url = rootPath + '/admin/usersManage'
  return http.get(url, pageNum)
}
//删除用户
const admin_delUsers = userIds => {
  const url = rootPath + '/admin/delUser'
  return http.get(url, userIds)
}
//修改用户信息
const admin_changeUserInfo = userIds => {
  const url = rootPath + '/admin/changeUserInfo'
  return http.get(url, userIds)
}
//超级管理员修改用户管理权限
const admin_setAdmin = params => {
  const url = rootPath + '/admin/setAdmin'
  return http.get(url, params)
}
export { admin_userManage, admin_delUsers, admin_changeUserInfo, admin_setAdmin }