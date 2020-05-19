import post from '@/utils/post';
import { demo } from './adapter';
// get加括号，第二个参数为{
//   params
// }
export const getLocation = async params => await demo.get(
  '/articl/',
  { params }
);
export const postArticle = post('/article/');


// 个人空间部分接口
export const getMyArticles = async params => await demo.get(
  '/ShowMyArticles/',
  { params }
);
export const getArticleDetail = async params => await demo.get(
  '/ArticleDetail/',
  { params }
);
export const getSearchByLocation = async params => await demo.get(
  '/SearchByLocation/',
  { params }
);
export const getSearchByDate = async params => await demo.get(
  '/SearchByDate/',
  { params }
);
export const getSummary = async params => await demo.get(
  '/Summary/',
  { params }
);


// post，delete，put不加括号，第二个参数直接为params
// post第一个参数为url，调用处传params
export const postRegUser = post('/regist/');

export const postLogUser = post('/login/');

// 文章的点赞、评论
export const postRemark = async data => await demo.post(
  '/remark/',
  data
);
export const postLike = async data => await demo.post(
  '/like/',
  data
);
