import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/page/index/'
import PageRouter from './page/'
import ViewsRouter from './views/'

const _import = require('./_import');
Vue.use(VueRouter);
export default new VueRouter({
  mode: 'hash',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  },
  routes: []
});
// export const asyncRouterMap = [].concat(PageRouter,ViewsRouter)
export const asyncRouterMap = [].concat(PageRouter, ViewsRouter)
