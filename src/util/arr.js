/**
 *
 * 字符串工具类
 *
 *
 * */

class ArrayUtil {

  static isEmpty(obj) {

    //为null 或者 undefined
    if(!obj){
      return false;
    }

    // 为 []
    if(obj == []){
      return false;
    }

    return true;
  }

  static isArray (o) { //是否数组
    return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
  }

  // 获取复杂对象数组中，某个key的value集合
  static getValues(arr, key){
    let result = [];
    arr.forEach(function(obj,index){
      //code something
      if(!obj[key]){
        obj[key] = null;
        result.push('');
      }
      result.push(obj[key]);
    });
    return result;
  }


}

export default ArrayUtil
