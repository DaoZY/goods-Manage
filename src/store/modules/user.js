import auth from '@/util/auth'
import {setStore, getStore, removeStore} from '@/util/store'
import router from '@/router/router'

const user = {
  state: {
    userInfo: {},
    permission: {},
    roles: [],
    menu: []
  },
  actions: {


    //存储个人信息
    setUserInfo({commit, state, dispatch}, data) {
      return new Promise((resolve, reject) => {
        commit('SET_USERIFNO', data);
        resolve();
      });

    },

    //添加动态路由
    setRoute({commit, state, dispatch}, data) {
      return new Promise((resolve, reject) => {
        commit('SET_ROUTE', data);
        resolve();
      });
    },

    //存储菜单
    setMenu({commit, state, dispatch}, data) {
      return new Promise((resolve, reject) => {
        commit('SET_MENU', data);
        resolve();
      });
    },

    //设置角色
    setRole({commit, state, dispatch}, data) {
      return new Promise((resolve, reject) => {
        commit('SET_ROLES', data);
        resolve();
      });
    },
    //设置权限，为控制按钮做铺垫
    setPermission({commit, state, dispatch}, data) {
      return new Promise((resolve, reject) => {
        commit('SET_PERMISSION', data);
        resolve();
      });
    }

  },
  mutations: {

    SET_USERIFNO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_ROUTE: (state, routes) => {
      let routeArr = [{
        path: '*',
        redirect: '/404'
      }];
      router.addRoutes(routes);
    },
    SET_MENU: (state, menu) => {
      state.menu = menu;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = {};
      permission.forEach(ele => {
        state.permission[ele] = true;
      });
    }
  }

}
export default user
