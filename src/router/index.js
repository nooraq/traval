import Vue from 'vue';
import Router from 'vue-router';
import writePage from './configParts/writePage';
import ArticalShow from './configParts/ArticalShow';

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
        writePage,
        ArticalShow
      ]
    },
    {
      path: '*',
      component: () => import('@/views/ErrorPage')
    }
  ]
});
