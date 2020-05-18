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

// post，delete，put不加括号，第二个参数直接为params

export const postRegUser = async data => await demo.post(
  '/regist/',
  data
);
