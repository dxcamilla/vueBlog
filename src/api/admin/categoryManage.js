import http from '../http'
const rootPath = process.env.VUE_APP_serverURL;
const admin_categoryManage = () => {
  const url = rootPath + '/admin/categoriesManage';
  return http.get(url)
}
const admin_delCategory = cateIds => {
  const url = rootPath + '/admin/delCategory'
  return http.get(url, cateIds)
}
const admin_addCategory = cateName => {
  const url = rootPath + '/admin/addCategory'
  return http.get(url, cateName)
}
const admin_changeCategory = cateId => {
  const url = rootPath + '/admin/changeCategory'
  return http.get(url, cateId)
}

export {
  admin_categoryManage,
  admin_delCategory,
  admin_addCategory,
  admin_changeCategory
}