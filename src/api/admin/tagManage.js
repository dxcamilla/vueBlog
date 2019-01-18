import http from '../http'
const rootPath = process.env.VUE_APP_serverURL;
const admin_tagManage = (params) => {
  const url = rootPath + '/admin/tagsManage';
  return http.get(url, params)
}
const admin_delTag = params => {
  const url = rootPath + '/admin/delTag'
  return http.get(url, params)
}
const admin_addTag = params => {
  const url = rootPath + '/admin/addTag'
  return http.get(url, params)
}
const admin_changeTag = params => {
  const url = rootPath + '/admin/changeTag'
  return http.get(url, params)
}

export {
  admin_tagManage,
  admin_delTag,
  admin_addTag,
  admin_changeTag
}