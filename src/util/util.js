import {validatenull} from './validate'
import {baseUrl} from '@/config/env'

/**
 * 设置主题
 */
export const setTheme = (name) => {
  document.body.className = name;
}

/**
 * 获取字典
 */
export const setDic = (dicData, DIC) => {
  return (typeof(dicData) == 'string') ? DIC : dicData
}
/**
 * 设置px
 */
export const setPx = (val, defval) => {
  if (validatenull(val)) {
    val = defval;
  }
  val = val + '';
  if (val.indexOf('%') == -1) {
    val = val + 'px';
  }
  return val;
}
/**
 * 动态获取组件
 */
export const getComponent = (type) => {
  if (type == "select") {
    return "crudSelect";
  } else if (type == "radio") {
    return "crudRadio";
  } else if (type == "checkbox") {
    return "crudCheckbox";
  } else if (type == "date") {
    return "crudDate";
  } else {
    return "crudInput";
  }
};
/**
 * 加密处理
 */
export const encryption = (params) => {
  let {
    data,
    type,
    param,
    key
  } = params;
  let result = JSON.parse(JSON.stringify(data));
  if (type == 'Base64') {
    param.forEach(ele => {
      result[ele] = btoa(result[ele]);
    })
  } else if (type == 'Aes') {
    param.forEach(ele => {
      result[ele] = CryptoJS.AES.encrypt(result[ele], key).toString();
    })

  }
  return result;
};

/**
 * 设置浏览器头部标题
 */
export const setTitle = function (title) {
  title = title ? title : '系统管理';
  window.document.title = title;
};
/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen();
  } else {
    reqFullScreen();
  }
}
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen() {
    callback()
  }

  document.addEventListener("fullscreenchange", function (e) {
    listen();
  });
  document.addEventListener("mozfullscreenchange", function (e) {
    listen();
  });
  document.addEventListener("webkitfullscreenchange", function (e) {
    listen();
  });
  document.addEventListener("msfullscreenchange", function (e) {
    listen();
  });
}
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  var isFullscreen = document.fullscreenEnabled ||
    window.fullScreen ||
    document.mozFullscreenEnabled ||
    document.webkitIsFullScreen;
  return isFullscreen;
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  }
}
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen();
  }
}
/**
 * 递归寻找子类的父类
 */

export const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length != 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id == id) {
          return menu[i];
        } else {
          if (menu[i].children[j].children.length != 0) {
            return findParent(menu[i].children[j].children, id);
          }
        }
      }
    }
  }
}


/**
 * 转换为menu结构的数据
 */
export function convertToMenu(menuArr) {

  bulidHref(menuArr);
  let result = recursion(menuArr);
  return result;

  function recursion(menuArr){
    var result = [];
    if (!menuArr) return [];
    for (var i = 0; i < menuArr.length; i++) {
      var menuItem = menuArr[i];
      var menuObj = {};
      Object.keys(menuItem).forEach(function (key) {
        var value = menuItem[key];
        if (key === "id") {
          menuObj.id = value;
        } else if (key === "code") {
          menuObj.href = value;
        } else if (key === "icon") {
          menuObj.icon = value;
        } else if (key === 'name') {
          menuObj.label = value;
        } else if (key === "children") {
          menuObj[key] = convertToMenu(value);
        }

      });

      result.push(menuObj);
    }
    return result;
  }
  /**
   * 组织菜单的href, 父菜单设置为“”，子菜单设置为 parent.href + child.href
   */
  function bulidHref(menuArr) {

    for (let i = 0; i < menuArr.length; i++) {
      var href = filterUrl(menuArr[i].code);
      if (menuArr[i].children.length != 0) {
        //把父节点的url设为空
        menuArr[i].code = "";
        let child = menuArr[i].children;
        for (let j = 0; j < child.length; j++) {
          //把子节点的url设为 parentUrl+childUrl
          child[j].code = href.concat(filterUrl(child[j].code));
          if (child[j].children.length == 0) {
            bulidHref(child);

          }
        }
      }
    }


    function filterUrl(url) {
      if(!url){
        return "";
      }
      if (url && !url.startsWith("/")) {
        url = "/".concat(url);
      }
      return url;
    }
  }
}
/**
 * 转换为route结构的数据
 */
export function convertToRoute(routesArr) {
  var newRoutes = [];
  if (!routesArr) return [];

  for (var i = 0; i < routesArr.length; i++) {
    var routeObj = routesArr[i];
    var newRouteObj = {};
    newRouteObj.component = getPromisedComponent(routeObj.url);
    newRouteObj.path = filterUrl(routeObj);
    newRouteObj.name = routeObj.name;
    newRouteObj.children = convertToRoute(routeObj.children);
    newRouteObj.meta = routeObj.meta;
    newRoutes.push(newRouteObj);
  }
  return newRoutes;


  function getPromisedComponent(url) {
    if(url == '_BLANK'){
      return () => import('@/page/index/Blank.vue')
    }else if(routeObj.url == 'Layout'
      || routeObj.url == 'layout/Layout'){
      return () => import('@/page/index/index.vue')
    }else{
      return () => import('@/views/' + url + '.vue')
    }

  }

  // 设置顶级节点路由的path首字母为 '/'
  function filterUrl(routeObj) {
    var url = routeObj.code;
    if(routeObj.url == 'Layout'
        || routeObj.url == 'layout/Layout'){
      if (url && !url.startsWith("/")) {
        url = "/".concat(url);
      }
    }
    return url;
  }
}

/**
 * 总体路由处理器
 */
export const resolveUrlPath = (url, name) => {

  let reqUrl = url;
  if (url.indexOf("http") != -1 || url.indexOf("https") != -1) {
    reqUrl = `/myiframe/urlPath?src=${reqUrl}&name=${name}`;
  } else {
    reqUrl = `${reqUrl}`;
  }
  return reqUrl;
}
/**
 * 总体路由设置器
 */
export const setUrlPath = ($route) => {
  let value = "";
  if ($route.query.src) {
    value = $route.query.src;
  } else {
    value = $route.path;
  }
  return value;
}
/**
 * 动态插入css
 */

export const loadStyle = url => {
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(link);
}
/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
  let result = '';
  if (validatenull(dic)) return value;
  if (typeof (value) == 'string' || typeof (value) == 'number' || typeof (value) == 'boolean') {
    let index = 0;
    index = findArray(dic, value);
    if (index != -1) {
      result = dic[index].label;
    } else {
      result = value;
    }
  } else if (value instanceof Array) {
    result = [];
    let index = 0;
    value.forEach(ele => {
      index = findArray(dic, ele);
      if (index != -1) {
        result.push(dic[index].label);
      } else {
        result.push(value);
      }
    });
    result = result.toString();
  }
  return result;
}
/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value == value) {
      return i;
      break;
    }
  }
  return -1;
}
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = '';
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len ? len : 4);
  if (date) random = random + Date.now();
  return random;
}
