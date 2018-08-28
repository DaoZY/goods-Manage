import service from 'axios'
import auth from '@/util/auth'
import Sign from '@/util/sign'
import store from '../store'
import { Message, Error } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import router from '@/router/router';

//默认请求响应超时时间
service.defaults.timeout = 10000;
//跨域请求，允许保存cookie
service.defaults.withCredentials = true;


// NProgress Configuration
NProgress.configure({ showSpinner: false })
let cfg, msg;
msg = '服务器君开小差了，请稍后再试';


//HTTPrequest拦截
service.interceptors.request.use(config => {
    //NProgress.start(); // start progress bar
    let sign = new Sign();
    if (store.getters.token) {
        config.headers['Authorization'] = store.getters.token; // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    }
    let privateKey = sign.getPrivateKey();
    let timestamp = new Date().getTime();
    if(config.method=='post'){
        let signParams = {
            ...config.data,
            _privateKey: privateKey,
            _timestamp: timestamp
        }
        config.headers['_timestamp'] = timestamp;
        config.headers['_signature'] = sign.sha1Obj(signParams);
    }
    return config;
}, error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
})
//HTTPresponse拦截
service.interceptors.response.use(data => {
    NProgress.done();
    if(data.data.code != '1'){
        Message({ showClose: true, message: data.data.msg, type: 'warning' });
        return Promise.reject(data.data.msg);
    }
    return data.data;
}, error => {
    NProgress.done();
    console.error(error);
    if(error.response.data.code === 603){
        Message({ showClose: true, message: error.response.data.msg, type: 'error' });
        store.dispatch("clearToken");
        store.dispatch("clearLock");
        store.dispatch("clearTag");
        router.push({ path: '/login' });
        //window.location.assign('/#/login');
        return Promise.reject(error.response.data.msg);
    }else{
        Message({ showClose: true, message: msg, type: 'error' });
        return Promise.reject(msg);
    }

})



const http = {
    /**
     *
     * 自定义get请求
     *
     */
    get: function(url, params, config){
        return service.get(url, {param: params}, config);
    },
    /**
     *
     * 自定义post请求
     *
     */
    post: function(url, params, config){
        return service.post(url, params, config);
    },
    /**
     *
     * 自定义文件上传方法
     *
     */
    upload: function(url, params, config){
        if(!config){
            config = service.defaults.headers;
            config['timeout'] = 1000*60*5;
            config['headers']['Content-Type'] = 'multipart/form-data';
            config['headers']['Authorization'] = auth.getToken();

        }
        let formData = new FormData(); //创建form对象

        for(let field in params) {
            if(params[field]) {
                formData.append(field, params[field]);
            }
        }

        service.post(url, formData, config);
    },

    /**
     *
     * 自定义文件下载方法
     *
     */
    download: function(url, params, config){
        var paramUrl = "?";
        for(let field in params) {
            if(params[field]) {
                paramUrl = paramUrl + field + "=" + params[field] + "&";
            }
        }
        paramUrl = paramUrl.substring(0, paramUrl.length-1);
        window.location.href = url + paramUrl;
    },

    /**
     *
     * 自定义文件下载方法二
     *
     */
    download2: function(url, params, config){

        if(!params.fileName){
            console.error("下载时，文件名不能为空");
        }
        var fileName = params.fileName;
        axios({
            method: 'post',
            url: url,
            data: params,
            responseType: 'blob'
        }).then(response => {

            if (!response) {
                return;
            }
            let url = window.URL.createObjectURL(new Blob([response]));
            let link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
        }).catch((error) => {
            console.log(error);
        })
    },

    /**
     *
     * 自定义文件预览方法
     *
     */
    preview: function(url, params, config){
        let paramUrl = "?";
        for(let field in params) {
            if(params[field]) {
                paramUrl = paramUrl + field + "=" + params[field] + "&";
            }
        }
        paramUrl = paramUrl.substring(0, paramUrl.length-1);
        window.open(url + paramUrl);
    }



}

export default http;