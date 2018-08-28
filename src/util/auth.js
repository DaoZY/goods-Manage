import Cookies from 'js-cookie'

const TOKEN_KEY = 'token';

const auth = {

  /**
   *
   * 获取token
   *
   */
  getToken: function (tokenKey) {
    if (!tokenKey) {
      return Cookies.get(TOKEN_KEY);
    } else {
      return Cookies.get(tokenKey);
    }
  },

  /**
   *
   * 保存token
   *
   */
  setToken: function (tokenValue, tokenKey, options) {

    /*if (!options) {
      options = {domain: process.env.DOMAIN};
    } else {
      options.domain = process.env.DOMAIN;
    }*/

    if (!options) {
      options = {};
    }

    if (!tokenKey) {
      return Cookies.set(TOKEN_KEY, tokenValue, options);
    } else {
      return Cookies.set(tokenKey, tokenValue, options);
    }
  },

  /**
   *
   * 获取token
   *
   */
  removeToken: function (tokenKey) {
    if (!tokenKey) {
      return Cookies.remove(TOKEN_KEY);
    } else {
      return Cookies.remove(tokenKey);
    }
  }


}

export default auth