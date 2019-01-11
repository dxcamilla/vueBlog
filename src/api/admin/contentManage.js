import http from '../http'
const rootPath = process.env.VUE_APP_serverURL;
const admin_contentManage = pageNum => {
  const url = rootPath + '/admin/contentsManage'
  return http.get(url, pageNum)
}
const admin_delContent = params => {
  const url = rootPath + '/admin/delContent'
  return http.get(url, params)
}


const admin_changeUserInfo = userIds => {
  const url = rootPath + '/admin/changeUserInfo'
  return http.get(url, userIds)
}
const admin_setAdmin = userIds => {
  const url = rootPath + '/admin/setAdmin'
  return http.get(url, userIds)
}
export { admin_contentManage, admin_delContent }