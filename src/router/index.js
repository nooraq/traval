import Vue from 'vue';
import Router from 'vue-router';
import writePage from './configParts/writePage';

// router lazy load
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'basic',
      component: () => import('@/components/BasicLayout'),
      children: [
        writePage
      ]
    },
    {
      path: '*',
      component: () => import('@/views/ErrorPage')
    }
  ]
});
