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
<<<<<<< HEAD
// 登录注册接口
export const postRegUser = async data => await demo.post(
  '/regist/',
  data
);
=======
// eg
// export const postRegUser = async params => await demo.post(
//   '/regist/',
//   params
// );
// post第一个参数为url，调用处传params
export const postRegUser = post('/regist/');

>>>>>>> 3198d81722ef60981f55eb5cfaa5982a7a2ff192
export const postLogUser = async data => await demo.post(
  '/login/',
  data
);

// 文章的点赞、评论
export const postRemark = async data => await demo.post(
  '/remark/',
  data
);
export const postLike = async data => await demo.post(
  '/like/',
  data
);