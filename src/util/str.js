/**
 *
 * 字符串工具类
 *
 *
 * */

class Str {

  // 判空
  static isEmpty(str) {
    //为空 或者 undefined
    if(!str){
      return false;
    }

    // 为 "" 或者 "   "
    if(str.trim().length == 0){
      return false;
    }

    return true;
  }

  /**
   * 去除空格
   * @param {str}
   * @param {type}
   *    type: 1-所有空格 2-前后空格 3-前空格 4-后空格
   * @return {String}
   */
  static trim (str, type) {
    type = type || 1
    switch (type) {
      case 1:
        return str.replace(/\s+/g, "");
      case 2:
        return str.replace(/(^\s*)|(\s*$)/g, "");
      case 3:
        return str.replace(/(^\s*)/g, "");
      case 4:
        return str.replace(/(\s*$)/g, "");
      default:
        return str;
    }
  }


  /**
   * @param {str}
   * @param {type}
   *    type: 1:首字母大写 2：首页母小写 3：大小写转换 4：全部大写 5：全部小写
   * @return {String}
   */
  static changeCase (str, type) {
    type = type || 4
    switch (type) {
      case 1:
        return str.replace(/\b\w+\b/g, function (word) {
          return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();

        });
      case 2:
        return str.replace(/\b\w+\b/g, function (word) {
          return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
        });
      case 3:
        return str.split('').map( function(word){
          if (/[a-z]/.test(word)) {
            return word.toUpperCase();
          }else{
            return word.toLowerCase()
          }
        }).join('')
      case 4:
        return str.toUpperCase();
      case 5:
        return str.toLowerCase();
      default:
        return str;
    }
  }

  /*过滤html代码(把<>转换)*/
  static filterTag (str) {
    str = str.replace(/&/ig, "&");
    str = str.replace(/</ig, "<");
    str = str.replace(/>/ig, ">");
    str = str.replace(" ", " ");
    return str;
  }

  // 校验字符串格式
  static checkStr (str, type) {
    switch (type) {
      case 'phone':  //手机号码
        return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
      case 'tel':   //座机
        return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
      case 'card':  //身份证
        return /^\d{15}|\d{18}$/.test(str);
      case 'pwd':   //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
        return /^[a-zA-Z]\w{5,17}$/.test(str)
      case 'postal': //邮政编码
        return /[1-9]\d{5}(?!\d)/.test(str);
      case 'QQ':   //QQ号
        return /^[1-9][0-9]{4,9}$/.test(str);
      case 'email':  //邮箱
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
      case 'money':  //金额(小数点2位)
        return /^\d*(?:\.\d{0,2})?$/.test(str);
      case 'URL':   //网址
        return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
      case 'IP':   //IP
        return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
      case 'date':  //日期时间
        return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
      case 'number': //数字
        return /^[0-9]$/.test(str);
      case 'english': //英文
        return /^[a-zA-Z]+$/.test(str);
      case 'chinese': //中文
        return /^[\u4E00-\u9FA5]+$/.test(str);
      case 'lower':  //小写
        return /^[a-z]+$/.test(str);
      case 'upper':  //大写
        return /^[A-Z]+$/.test(str);
      case 'HTML':  //HTML标记
        return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
      default:
        return true;
    }
  }
}

export default Str
