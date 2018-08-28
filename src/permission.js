import router from './router/router';
import store from './store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import auth from '@/util/auth';
import {vaildUtil} from '@/util/yun';
import {setTitle} from '@/util/util';
import {validatenull} from '@/util/validate';
import {asyncRouterMap} from '@/router/router';
import LoginApi from "@/api/LoginApi";
import {setStore, getStore} from '@/util/store.js';
import {menu} from '@/mock/menu';
import {convertToRoute, convertToMenu} from "@/util/util";

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration
function hasPermission(roles, permissionRoles) {
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const lockPage = store.getters.website.lockPage;
router.addRoutes(asyncRouterMap); // 动态添加可访问路由表
router.beforeEach((to, from, next) => {
  NProgress.start();// start progress bar
  if (!auth.getToken()) {

    // 如果cookie中不包含token,则是跨域的切应用操作
    let flag = true;
    const whiteList = store.getters.website.whiteList
    for (let i = 0; i < whiteList.length; i++) {
      if (new RegExp("^" + whiteList[i].toString() + ".*", "g").test(to.path)) {
        flag = false;
        break;
      }
    }

    if (!flag) {
      // 如果访问的是登录页等不需要限制的页面,则放行
      next();
    } else {
      // 如果是其他页面，且没有token参数，则是登录超时，或第一次访问系统，跳转至登录页
      if(!to.query.token){
        next('/login');
      }else{
        // 否则是切换应用操作，重新加载缓存
        reloadCache(to.query.token);
        next(to.path);
      }
      // next('/login');
      NProgress.done();
    }
    /*this.$confirm('登录超时，请重新登录？', '提示', {
        type: 'warning'
    }).then(() => {
        next('/login');
        NProgress.done();
    });*/

  } else {
    // 如果store中不存在token,则证明刷新页面，或者同域名下的切应用操作
    if (!store.getters.token) {
      //重新加载缓存信息
      reloadCache(auth.getToken());
      next(to.path);
      // router.push({ path: store.getters.tagWel.value });
    } else {
      // 如果store中页存在token,则证明是同一个应用操作。
      // 如果存在锁屏页，则跳转至该页面。
      if (store.getters.isLock && to.path != lockPage) {
        next({
          path: lockPage
        })
        NProgress.done();
        // 如果路径是login，则直接跳转至login
      } else if (to.path === '/login') {
        next({
          path: '/'
        })
        NProgress.done();
        // 否则...，没看懂
      } else {
        let flag = true;
        const whiteList = store.getters.website.whiteList;
        for (let i = 0; i < whiteList.length; i++) {
          if (new RegExp("^" + whiteList[i].toString() + ".*", "g").test(to.path)) {
            flag = false;
            break;
          }
        }
        if (flag) {
          const value = to.query.src ? to.query.src : to.path;
          const label = to.query.name ? to.query.name : to.name;
          store.commit('ADD_TAG', {
            label: label,
            value: value,
            query: to.query
          });
        }
        next();
      }
    }

  }
})

// 重新加载缓存信息
function reloadCache(token) {
  //存储token
  let param = {token: token}
  store.dispatch("setToken", param);

  //每次初始化该页面时吗，重新加载个人可以访问的菜单及路由
  let loginApi = new LoginApi();

  //重新加载用户信息
  let userParam = {};
  loginApi.getUserInfo(userParam).then(res => {
    //存储该用户在该应用下的菜单
    store.dispatch("setUserInfo", res.data).then(res => {

    });
  });

  //重新加载资源
  let appParam = {appId: '1'};
  loginApi.getMenu(appParam).then(res => {

    //存储该用户在该应用下动态路由
    let routes = convertToRoute(res.data);
    store.dispatch("setRoute", routes).then(res => {
    });

  });

}

//寻找子菜单的父类
function findMenuParent(tag) {
  let tagCurrent = [];
  const menu = store.getters.menu;
  tagCurrent.push(tag);
  return tagCurrent;
  // //如果是一级菜单直接返回
  // for (let i = 0, j = menu.length; i < j; i++) {
  //     if (menu[i].href == tag.value) {
  //         tagCurrent.push(tag);
  //         return tagCurrent;
  //     }
  // }

  // let currentPathObj = menu.filter(item => {
  //     if (item.children.length == 1) {
  //         return item.children[0].href === tag.value;
  //     } else {
  //         let i = 0;
  //         let childArr = item.children;
  //         let len = childArr.length;
  //         while (i < len) {
  //             if (childArr[i].href === tag.value) {
  //                 return true;
  //                 break;
  //             }
  //             i++;
  //         }
  //         return false;
  //     }
  // })[0];
  // tagCurrent.push({
  //     label: currentPathObj.label,
  //     value: currentPathObj.href
  // });
  // tagCurrent.push(tag);
  // return tagCurrent;

}

router.afterEach((to, from) => {
  NProgress.done();
  setTimeout(() => {
    const tag = store.getters.tag;
    setTitle(tag.label);
    store.commit('SET_TAG_CURRENT', findMenuParent(tag));
    /*//百度统计代码
    var _hmt = _hmt || [];
    (function () {
        //每次执行前，先移除上次插入的代码
        document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?23c7f40fa073fadc2a7f8bfe079fd17f";
        hm.id = "baidu_tj"
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();*/

    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }

    gtag('js', new Date());
    gtag('config', 'UA-105756702-2');
  }, 0);
})
