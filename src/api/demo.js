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

export const postRegUser = async data => await demo.post(
  '/regist/',
  data
);
export const postLogUser = async data => await demo.post(
  '/login/',
  data
);
export const pt = async data => await demo.post(
  '/tests/',
  data
);
