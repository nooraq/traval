import Vue from 'vue';
import Router from 'vue-router';
import writePage from './configParts/writePage';
import articalShow from './configParts/articalShow';
import mapTrack from './configParts/mapTrack';
import login from './configParts/login';
import personalSpace from './configParts/personalSpace';

// router lazy load
Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    login,
    {
      path: '/',
      name: 'basic',
      redirect: '/mapTrack',
      component: () => import('@/components/BasicLayout'),
      children: [
        writePage,
        ...articalShow,
        mapTrack,
        login,
        personalSpace
      ]
    },
    {
      path: '*',
      component: () => import('@/views/ErrorPage')
    }
  ]
});
