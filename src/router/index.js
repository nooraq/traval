import Vue from 'vue';
import Router from 'vue-router';
import egFor from './configParts/egFor';

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
        egFor
      ]
    },
    {
      path: '*',
      component: () => import('@/views/ErrorPage')
    }
  ]
});
