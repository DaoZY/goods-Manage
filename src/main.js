import Vue from 'vue';
import axios from './util/http';
import VueAxios from 'vue-axios';
import App from './App';
import './permission'; // 权限
import './errorLog'; // 错误日志
import 'babel-polyfill';
import router from './router/router';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ELEMENT from 'element-ui';
import {loadStyle} from './util/util'
import * as urls from '@/config/env';
import { iconfontUrl, iconfontVersion } from '@/config/env';
import * as filters from './filters' // 全局filter
import './styles/common.scss';
import './components/index.js';
import basicContainer from './components/basic-container/main'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

Vue.use(VueAxios, axios)

//add font-awesome5
library.add(faCoffee)
Vue.component('fa', FontAwesomeIcon)
Vue.component('basicContainer', basicContainer)

Object.keys(urls).forEach(key => {
    Vue.prototype[key] = urls[key];
})

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

/*
iconfontVersion.forEach(ele => {
    loadStyle(iconfontUrl.replace('$key', ele));
})*/

Vue.config.productionTip = false;


export function createApp() {
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })
    return {
        app,
        router,
        store
    }
}
