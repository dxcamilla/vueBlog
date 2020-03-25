import { staticRouterMap, asyncRouterMap } from '@/router/router'
function hasPermission (role, route) {
  if (route.meta && route.meta.admins) {
    const admins = route.meta.admins;
    return admins.includes(role);
  } else {
    return true;
  }
}
function filterAsyncRouter (routes, role) {
  const res = [];
  routes.forEach(route => {
    console.log(route)
    const tmp = { ...route };
    if (hasPermission(role, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, role);
      }
      res.push(tmp);
    }
  })
  console.log(res);
  return res;
}
const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = staticRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { admins } = data;
        let accessedRouters;
        if (admins.toString() === '2') {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, admins);
        }
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  }
}
export default permission