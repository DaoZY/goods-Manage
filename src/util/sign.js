import crypto from 'crypto';
import auth from '@/util/auth';
class Sign {

    /**
     *
     * md5加密字符串
     *
     */
    md5Str(str){
        const hash = crypto.createHash('md5');
        hash.update(str);
        return hash.digest('hex').toUpperCase();
    }

    /**
     *
     * 按照指定排序，md5加密字符串
     *
     */
    md5Obj(obj, sort){
        var keys = Object.keys(obj).sort();
        //遍历排序后的参数数组中的每一个key/value对
        let str = '';
        keys.forEach(function(key){
            str = str + key + "=" + obj[key] + "&";
        });

        //通过md5算法为签名字符串生成一个md5签名，该签名就是我们要追加的sign参数值
        return this.md5Str(str);
    }

    /**
     *
     * sha1加密字符串
     *
     */
    sha1Str(str){
        const hash = crypto.createHash('sha1');
        hash.update(str);
        return hash.digest('hex').toUpperCase();
    }

    /**
     *
     * 按照指定排序，sha1加密字符串
     *
     */
    sha1Obj(obj, sort){
        var keys = Object.keys(obj).sort();
        //遍历排序后的参数数组中的每一个key/value对
        let str = '';
        keys.forEach(function(key){
            if(typeof(obj[key]) != 'object'
                && typeof(obj[key]) != "undefined"
                && obj[key] != null){
                str = str + key + "=" + obj[key] + "&";
            }
        });

        //通过md5算法为签名字符串生成一个md5签名，该签名就是我们要追加的sign参数值
        let result = this.sha1Str(str);
        console.log(result);
        return result;
    }

    getPrivateKey(){
        if(!auth.getToken()){
            return null;
        }
        let tokenParts = auth.getToken().split('.');
        return tokenParts.pop();
    }

}

export default Sign