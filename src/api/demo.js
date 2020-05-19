import post from '@/utils/post';
import { demo } from './adapter';
// get加括号，第二个参数为{
//   params
// }
export const getLocation = async params => await demo.get('/articl/', {
  params
});

export const getMyArticles = async params => await demo.get(
  '/ShowMyArticles/',
  {
    params
  }
);
export const getRe = async params => await demo.get(
  '/regist/',
  {
    params
  }
);

// post，delete，put不加括号，第二个参数直接为params
// eg
// export const postRegUser = async params => await demo.post(
//   '/regist/',
//   params
// );
// post第一个参数为url，调用处传params
export const postRegUser = post('/regist/');

export const postLogUser = async data => await demo.post(
  '/login/',
  data
);
export const pt = async data => await demo.post(
  '/tests/',
  data
);
