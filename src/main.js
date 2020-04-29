import Vue from 'vue';
import '@/plugins/logger';
import './theme/index.scss';
// 以下三项不需要的时候可以注释掉
import './plugins/element';

import router from './router';
import store from './store';

import App from './App.vue';


Vue.config.productionTip = false;

Vue.$log.info('vue-eslint launch...');
new Vue({
  router,
  store,
  render(h) { return h(App); }
}).$mount('#app');

// 修复输出路由bug
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}