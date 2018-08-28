import { setStore,getStore, removeStore} from '@/util/store'
import {validatenull} from '@/util/validate'
import { baseUrl} from '@/config/env';
import website from '@/const/website'
import auth from '@/util/auth'
const common = {

    state: {
        isCollapse: false,
        isFullScren: false,
        isLock: getStore({
            name: 'isLock'
        }) || false,
        theme: getStore({
            name: 'theme'
        }) || '#409EFF',
        themeName: getStore({
            name: 'themeName'
        }) || '',
        lockPasswd: getStore({
            name: 'lockPasswd'
        }) || '',
        website: website,
        token: ''
    },
    actions: {
        //获取字典公用类
        GetDic({
            commit,
            state,
            dispatch
        }, dic) {
            return new Promise((resolve, reject) => {
                if (dic instanceof Array) {
                    Promise.all(dic.map(ele => getDic(ele))).then(data => {
                        let result = {};
                        dic.forEach((ele, index) => {
                            result[ele] = data[index].data;
                        })
                        resolve(result)
                    })
                }
            })
        },

        //存储token
        setToken({ commit, state, dispatch }, data) {
            return new Promise((resolve, reject) => {
                commit('SET_TOKEN', data.token);
                resolve();
            });
        },

        //清除锁屏状态
        clearToken({ commit, state }) {
            commit('CLEAR_TOKEN');
        },

        RefeshToken() {
            return new Promise((resolve, reject) => {
                resolve({ data: new Date().getTime() });
            })
        },

        //清除锁屏状态
        clearLock({ commit, state }) {
            commit('CLEAR_LOCK');
        }

    },
    mutations: {
        SET_COLLAPSE: (state, action) => {
            state.isCollapse = !state.isCollapse;
        },
        SET_FULLSCREN: (state, action) => {
            state.isFullScren = !state.isFullScren;
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
            auth.setToken(token);
            setStore({ name: 'token', content: token, type: 'session' });
        },
        CLEAR_TOKEN: (state) => {
            state.token = '';
            auth.removeToken();
            removeStore({ name: 'token' });

        },
        CLEAR_LOCK: (state, action) => {
            state.isLock = false;
            state.lockPasswd = '';
            removeStore({
                name: 'lockPasswd'
            });
            removeStore({
                name: 'isLock'
            });
        },
        SET_LOCK: (state, action) => {
            state.isLock = true;
            setStore({
                name: 'isLock',
                content: state.isLock,
                type: 'session'
            })
        },
        SET_THEME: (state, color) => {
            state.theme = color;
            setStore({
                name: 'theme',
                content: state.theme,
            })
        },
        SET_THEME_NAME: (state, themeName) => {
            state.themeName = themeName;
            setStore({
                name: 'themeName',
                content: state.themeName,
            })
        },
        SET_LOCK_PASSWD: (state, lockPasswd) => {
            state.lockPasswd = lockPasswd;
            setStore({
                name: 'lockPasswd',
                content: state.lockPasswd,
                type: 'session'
            })
        }
    }
}
export default common
