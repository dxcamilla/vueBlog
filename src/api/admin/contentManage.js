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
const admin_addContent = params => {
  const url = rootPath + '/admin/editableContent'
  return http.get(url, params)
}
const admin_creatContent = params => {
  const url = rootPath + '/admin/addContent'
  return http.get(url, params)
}
const admin_updateContent = params => {
  const url = rootPath + '/admin/changeContent'
  return http.get(url, params)
}
export { admin_contentManage, admin_delContent, admin_addContent, admin_creatContent, admin_updateContent }