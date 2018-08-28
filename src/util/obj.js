/**
 *
 * 字符串工具类
 *
 *
 * */

class ObjUtil {

  static isEmpty(obj) {

    //为null 或者 undefined
    if(!obj){
      return false;
    }

    // 为 {}
    if(obj == {}){
      return false;
    }

    // 为 []
    if(obj == []){
      return false;
    }

    return true;
  }


  static isString (o) { //是否字符串
    return Object.prototype.toString.call(o).slice(8, -1) === 'String'
  }
  static isNumber (o) { //是否数字
    return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
  }
  static isObj (o) { //是否对象
    return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
  }
  static isArray (o) { //是否数组
    return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
  }
  static isDate (o) { //是否时间
    return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
  }
  static isBoolean (o) { //是否boolean
    return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
  }
  static isFunction (o) { //是否函数
    return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
  }
  static isNull (o) { //是否为null
    return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
  }
  static isUndefined (o) { //是否undefined
    return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
  }
  static isFalse (o) {
    if (o == '' || o == undefined || o == null || o == 'null' || o == 'undefined' || o == 0 || o == false || o == NaN) return true
    return false
  }
  static isTrue (o) {
    return !this.isFalse(o)
  }

}

export default ObjUtil
