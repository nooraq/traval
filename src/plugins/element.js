import Vue from 'vue';
import Element from 'element-ui';
import './element-variable.scss';

Vue.use(Element);
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
